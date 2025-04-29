import { create } from 'zustand'
import { mockGalleryImages } from '@/utils/mockData'
import { IGalleryImage } from '@/types'
import { DateRange } from 'react-day-picker'

interface FilterOptions {
    artStyle: string
    colorTone: string
    dateRange?: DateRange
    sortBy: string
    visibility: string
    tags?: string[]
}

interface GalleryStore {
    images: IGalleryImage[]
    filters: FilterOptions
    filteredImages: IGalleryImage[]
    deleteImage: (imageId: string) => void
    resetImages: () => void
    setFilter: (filter: Partial<FilterOptions>) => void
    resetFilters: () => void
}

const defaultFilters: FilterOptions = {
    artStyle: 'all',
    colorTone: 'all',
    dateRange: undefined,
    sortBy: 'latest',
    visibility: 'all',
    tags: undefined
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
    images: mockGalleryImages,
    filters: defaultFilters,
    filteredImages: mockGalleryImages,

    deleteImage: (imageId: string) =>
        set(state => {
            const updatedImages = state.images.filter(img => img.id.toString() !== imageId)
            return {
                images: updatedImages,
                filteredImages: applyFilters(updatedImages, state.filters)
            }
        }),

    resetImages: () =>
        set(state => ({
            images: mockGalleryImages,
            filteredImages: applyFilters(mockGalleryImages, state.filters)
        })),

    setFilter: (filter: Partial<FilterOptions>) =>
        set(state => {
            const newFilters = { ...state.filters, ...filter }
            return {
                filters: newFilters,
                filteredImages: applyFilters(state.images, newFilters)
            }
        }),

    resetFilters: () =>
        set(state => ({
            filters: defaultFilters,
            filteredImages: applyFilters(state.images, defaultFilters)
        }))
}))

function applyFilters(
    images: IGalleryImage[],
    filters: FilterOptions
): IGalleryImage[] {
    let filtered = [...images]

    // 아트 스타일 필터
    if (filters.artStyle !== 'all') {
        filtered = filtered.filter(img =>
            img.artStyle === filters.artStyle
        )
    }

    // 컬러 톤 필터
    if (filters.colorTone !== 'all') {
        filtered = filtered.filter(img =>
            img.colorTone === filters.colorTone
        )
    }

    // 태그 필터
    if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter(img =>
            filters.tags!.some(tag => img.tags.includes(tag))
        )
    }

    // 날짜 범위 필터
    if (filters.dateRange?.from) {
        filtered = filtered.filter(img => {
            const imgDate = new Date(img.createdAt)
            const from = filters.dateRange?.from as Date
            const to = filters.dateRange?.to || from
            return imgDate >= from && imgDate <= to
        })
    }

    // 공개 설정 필터
    if (filters.visibility !== 'all') {
        filtered = filtered.filter(img =>
            filters.visibility === 'public' ? img.isPublic : !img.isPublic
        )
    }

    // 정렬
    filtered.sort((a, b) => {
        switch (filters.sortBy) {
            case 'oldest':
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
            case 'latest':
            default:
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
        }
    })

    return filtered
}
