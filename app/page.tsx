"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PromptInput } from "@/components/PromptInput";
import { CommunityFeedCard } from "@/components/CommunityFeedCard";
import { mockFeedData } from "@/lib/mockData";

export default function Home() {
  const [visibleItems, setVisibleItems] = useState(4);

  const handleShowMore = () => {
    setVisibleItems((prev) => Math.min(prev + 4, mockFeedData.length));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8">
      {/* 헤더 */}
      <header className="w-full max-w-7xl mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Artify Logo"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <h1 className="text-2xl font-bold text-[#4A90E2]">Artify</h1>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/gallery" className="text-gray-600 hover:text-gray-900">
            갤러리
          </Link>
          <Link href="/community" className="text-gray-600 hover:text-gray-900">
            커뮤니티
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">
            프로필
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center w-full max-w-7xl flex-1">
        {/* 프롬프트 입력 섹션 */}
        <section className="w-full flex flex-col items-center py-12 md:py-20">
          <h2 className="text-3xl font-bold mb-6 text-center">
            AI로 상상을 현실로 만들어보세요
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-xl">
            간단한 텍스트 프롬프트만으로 특별한 이미지를 생성해보세요. 당신의
            창의력을 AI가 시각화합니다.
          </p>

          <PromptInput className="mb-2" />

          <p className="text-xs text-gray-500 mt-2">
            예시: 푸른 바다 위를 날아가는 하얀 드래곤, 몽환적인 분위기
          </p>
        </section>

        {/* 커뮤니티 피드 섹션 */}
        <section className="w-full py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">커뮤니티 피드</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {mockFeedData.slice(0, visibleItems).map((feedItem) => (
              <CommunityFeedCard key={feedItem.postId} feedItem={feedItem} />
            ))}
          </div>

          {visibleItems < mockFeedData.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleShowMore}
                className="px-6 py-2 rounded-md bg-[#4A90E2] text-white hover:bg-[#3A80D2] transition-colors"
              >
                더 보기
              </button>
            </div>
          )}
        </section>
      </main>

      {/* 푸터 */}
      <footer className="w-full max-w-7xl py-8 mt-16 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image
              src="/logo.svg"
              alt="Artify Logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-gray-600">
              © 2023 Artify. All rights reserved.
            </span>
          </div>

          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              개인정보 처리방침
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              문의하기
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
