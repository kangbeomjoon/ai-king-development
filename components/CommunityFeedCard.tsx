"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CommentsModal from "./CommentsModal";
import { getMockComments } from "@/lib/mockData";
import { IComment, IFeedItem, ICommunityFeedCardProps } from "@/types";

export function CommunityFeedCard({
  feedItem: initialFeedItem,
}: ICommunityFeedCardProps) {
  const [feedItem, setFeedItem] = useState<IFeedItem>({
    ...initialFeedItem,
    isLiked: initialFeedItem.isLiked || false,
  });
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(initialFeedItem.comments);

  // 기본 댓글 데이터 로드
  const [initialComments, setInitialComments] = useState<IComment[]>([]);

  useEffect(() => {
    const mockComments = getMockComments(feedItem.postId);
    setInitialComments(mockComments);
  }, [feedItem.postId]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 컴포넌트의 기본 동작 방지
    setFeedItem((prev) => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
    }));
  };

  const handleCommentsClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 컴포넌트의 기본 동작 방지
    setIsCommentsOpen(true);
  };

  // 새 댓글이 추가되면 카운트 증가
  const handleCommentAdded = () => {
    setCommentCount((prev) => prev + 1);
    setFeedItem((prev) => ({
      ...prev,
      comments: prev.comments + 1,
    }));
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg">
        <Link href={`/post/${feedItem.postId}`}>
          <div className="relative aspect-square">
            <Image
              src={feedItem.imageURL}
              alt={`${feedItem.userName}의 AI 생성 이미지`}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{feedItem.userName}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLikeClick}
                className="flex items-center gap-1 transition-all hover:scale-110"
                aria-label={feedItem.isLiked ? "좋아요 취소" : "좋아요"}
              >
                <Heart
                  size={18}
                  className={
                    feedItem.isLiked
                      ? "fill-red-500 text-red-500"
                      : "hover:fill-red-200"
                  }
                />
                <span className="text-sm font-medium">{feedItem.likes}</span>
              </button>
              <button
                onClick={handleCommentsClick}
                className="flex items-center gap-1 transition-all hover:scale-110"
                aria-label="댓글 보기"
              >
                <MessageCircle size={18} className="hover:fill-gray-200" />
                <span className="text-sm font-medium">{feedItem.comments}</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <CommentsModal
        postId={feedItem.postId}
        open={isCommentsOpen}
        onOpenChange={setIsCommentsOpen}
        initialComments={initialComments}
        onCommentAdded={handleCommentAdded}
      />
    </>
  );
}
