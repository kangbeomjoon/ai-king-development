"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PageProps {
  searchParams: {
    prompt?: string;
  };
}

export default function GeneratePage({ searchParams }: PageProps) {
  const { prompt = "" } = searchParams;

  // 실제로는 API를 호출하지만, 목업 데이터 사용
  const isGenerating = false; // 생성 중 상태 표시
  const imageUrl = "https://picsum.photos/seed/generate/800"; // 목업 이미지

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8">
      {/* 헤더 */}
      <header className="w-full max-w-7xl mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg" // 서비스에 맞는 로고 이미지 필요
            alt="Artify Logo"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <h1 className="text-2xl font-bold text-[#4A90E2]">Artify</h1>
        </Link>
      </header>

      <main className="flex flex-col items-center w-full max-w-7xl flex-1">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* 프롬프트 표시 */}
          <div className="bg-gray-100 p-4 rounded-md w-full mb-8">
            <h2 className="text-lg font-medium mb-2">사용된 프롬프트:</h2>
            <p className="text-gray-700">{prompt || "프롬프트 없음"}</p>
          </div>

          {/* 이미지 섹션 */}
          <div className="w-full aspect-square relative mb-8 rounded-lg overflow-hidden shadow-lg">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#4A90E2]"></div>
                <p className="mt-4 text-gray-600">이미지 생성 중...</p>
              </div>
            ) : (
              <Image
                src={imageUrl}
                alt="생성된 이미지"
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-4">
            <Button
              className="bg-[#4A90E2] hover:bg-[#3A80D2]"
              onClick={() => window.history.back()}
            >
              돌아가기
            </Button>

            <Button
              className="bg-[#5AC18E] hover:bg-[#4AB17E]"
              disabled={isGenerating}
            >
              갤러리에 저장
            </Button>

            <Button
              className="bg-[#4A90E2] hover:bg-[#3A80D2]"
              disabled={isGenerating}
            >
              공유하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
