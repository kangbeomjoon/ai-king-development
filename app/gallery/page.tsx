"use client";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { useGalleryStore } from "@/store/gallery";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const { resetImages } = useGalleryStore();
  const router = useRouter();

  // 페이지 로드 시 데이터 초기화 (실제 구현에서는 API 호출로 변경)
  useEffect(() => {
    resetImages();
  }, [resetImages]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">내 갤러리</h1>
          <p className="text-gray-500 mt-1">
            내가 생성한 이미지들을 관리하고 커뮤니티에 공유해보세요
          </p>
        </div>
        <Button
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> 새 이미지 생성
        </Button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">필터 및 정렬</h2>
        <GalleryFilters />
      </div>

      <GalleryGrid />

      <div className="mt-10 text-center">
        <p className="text-gray-500">더 이상 이미지가 없습니다</p>
      </div>
    </div>
  );
}
