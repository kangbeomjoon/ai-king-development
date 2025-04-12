"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { IComment, ICommentsModalProps } from "@/types";

const CommentsModal = ({
  postId,
  open,
  onOpenChange,
  initialComments = [],
  onCommentAdded,
}: ICommentsModalProps) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");

  // 모달이 열릴 때 댓글 데이터를 다시 로드
  useEffect(() => {
    if (open && initialComments.length > 0) {
      setComments(initialComments);
    }
  }, [open, initialComments]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    // 실제로는 API를 호출하여 댓글을 저장하지만, 여기서는 목업 데이터로 처리
    const newCommentObj: IComment = {
      id: `${postId}-comment-${Date.now()}`,
      postId: postId,
      content: newComment,
      userName: "현재 사용자",
      userProfile: "https://i.pravatar.cc/150?u=currentuser",
      createdAt: new Date().toISOString(),
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");

    // 부모 컴포넌트에 댓글이 추가되었음을 알림
    if (onCommentAdded) {
      onCommentAdded();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  // 댓글 시간을 상대적 시간으로 변환하는 함수
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "방금 전";
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    return date.toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>댓글 {comments.length}개</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">닫기</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </DialogClose>
        </DialogHeader>

        {/* 댓글 입력 영역 */}
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src="https://i.pravatar.cc/150?u=currentuser"
              alt="현재 사용자"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="댓글을 입력하세요..."
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="flex justify-end mt-2">
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-[#4A90E2] hover:bg-[#3A80D2]"
              >
                작성
              </Button>
            </div>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="max-h-80 overflow-y-auto space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              첫 댓글을 작성해보세요!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={comment.userProfile}
                    alt={comment.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{comment.userName}</span>
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-800">{comment.content}</p>
                  <button className="text-xs text-gray-500 mt-1 hover:underline">
                    답글 달기
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;
