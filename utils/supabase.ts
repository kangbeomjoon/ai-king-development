import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

// Supabase 클라이언트 생성 함수
export const createSupabaseClient = async () => {
    const clerkAuth = await auth()
    // JWT 템플릿 이름을 지정하지 않고 기본 JWT 토큰 사용
    const clerkToken = await clerkAuth.getToken()

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${clerkToken}`
                }
            }
        }
    )
}
