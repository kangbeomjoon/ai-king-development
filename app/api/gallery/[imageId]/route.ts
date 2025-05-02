import { NextRequest, NextResponse } from 'next/server'
import { eq, and } from 'drizzle-orm'
import { db } from '@/db'
import { images } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import {
    IUpdateImageRequest,
    IUpdateImageResponse,
    IErrorResponse
} from '@/types'

// 이미지 정보 수정
export async function PATCH(
    request: NextRequest,
    { params }: { params: { imageId: string } }
) {
    try {
        const user = await currentUser()
        if (!user?.id) {
            return NextResponse.json<IErrorResponse>(
                {
                    success: false,
                    error: {
                        code: 'UNAUTHORIZED',
                        message: '인증되지 않은 사용자입니다.'
                    }
                },
                { status: 401 }
            )
        }

        const imageId = parseInt(params.imageId)
        const body: IUpdateImageRequest = await request.json()

        // 이미지 존재 여부 및 소유권 확인
        const existingImage = await db
            .select()
            .from(images)
            .where(and(eq(images.id, imageId), eq(images.userId, user.id)))
            .limit(1)

        if (!existingImage.length) {
            return NextResponse.json<IErrorResponse>(
                {
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: '이미지를 찾을 수 없습니다.'
                    }
                },
                { status: 404 }
            )
        }

        // 이미지 정보 업데이트
        const updateData: any = {
            updatedAt: new Date()
        }
        
        if (body.tags !== undefined) updateData.tags = body.tags
        if (body.isPublic !== undefined) updateData.isPublic = body.isPublic
        if (body.prompt !== undefined) updateData.prompt = body.prompt
        if (body.artStyle !== undefined) updateData.artStyle = body.artStyle
        if (body.colorTone !== undefined) updateData.colorTone = body.colorTone
        
        const updatedImage = await db
            .update(images)
            .set(updateData)
            .where(eq(images.id, imageId))
            .returning()

        return NextResponse.json<IUpdateImageResponse>({
            success: true,
            image: {
                id: updatedImage[0].id,
                userId: updatedImage[0].userId,
                filePath: updatedImage[0].filePath,
                prompt: updatedImage[0].prompt,
                artStyle: updatedImage[0].artStyle,
                colorTone: updatedImage[0].colorTone,
                tags: updatedImage[0].tags,
                isPublic: updatedImage[0].isPublic,
                createdAt: updatedImage[0].createdAt.toISOString(),
                updatedAt: updatedImage[0].updatedAt.toISOString()
            }
        })
    } catch (error) {
        console.error('Image PATCH Error:', error)
        return NextResponse.json<IErrorResponse>(
            {
                success: false,
                error: {
                    code: 'UPDATE_FAILED',
                    message: '이미지 정보 업데이트에 실패했습니다.'
                }
            },
            { status: 500 }
        )
    }
}

// 이미지 삭제
export async function DELETE(
    request: NextRequest,
    { params }: { params: { imageId: string } }
) {
    try {
        const user = await currentUser()
        if (!user?.id) {
            return NextResponse.json<IErrorResponse>(
                {
                    success: false,
                    error: {
                        code: 'UNAUTHORIZED',
                        message: '인증되지 않은 사용자입니다.'
                    }
                },
                { status: 401 }
            )
        }

        const imageId = parseInt(params.imageId)

        // 이미지 존재 여부 및 소유권 확인
        const existingImage = await db
            .select()
            .from(images)
            .where(and(eq(images.id, imageId), eq(images.userId, user.id)))
            .limit(1)

        if (!existingImage.length) {
            return NextResponse.json<IErrorResponse>(
                {
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: '이미지를 찾을 수 없습니다.'
                    }
                },
                { status: 404 }
            )
        }

        // 이미지 삭제
        await db.delete(images).where(eq(images.id, imageId))

        return NextResponse.json({
            success: true,
            message: '이미지가 성공적으로 삭제되었습니다.'
        })
    } catch (error) {
        console.error('Image DELETE Error:', error)
        return NextResponse.json<IErrorResponse>(
            {
                success: false,
                error: {
                    code: 'DELETE_FAILED',
                    message: '이미지 삭제에 실패했습니다.'
                }
            },
            { status: 500 }
        )
    }
}
