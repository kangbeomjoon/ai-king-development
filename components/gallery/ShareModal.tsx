"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { IGalleryImage, IShareModalProps } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function ShareModal({ image, isOpen, onClose }: IShareModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(image.tags);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag("");
    }
  };

  // Enter 키 처리를 위한 별도 함수
  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      const trimmedTag = newTag.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
        setNewTag("");
      }
      return false;
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleShare = async () => {
    // 제목이 없는 경우 유효성 검사
    if (!title.trim()) {
      toast({
        title: "제목을 입력해주세요",
        description: "게시물 제목은 필수 입력 항목입니다.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // 실제 구현에서는 API 호출
      // 목업 데이터로 성공 가정
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "게시물이 공유되었습니다",
        description: "커뮤니티에 성공적으로 공유되었습니다.",
      });

      // 성공 후 피드로 이동
      router.push("/");
    } catch (error) {
      toast({
        title: "공유 실패",
        description: "게시물 공유 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogTitle>커뮤니티에 공유하기</DialogTitle>
        <DialogDescription>
          이 이미지를 커뮤니티에 공유하기 위한 정보를 입력해주세요.
        </DialogDescription>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              제목 <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시물 제목을 입력하세요"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="게시물에 대한 설명을 입력하세요"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">태그</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="새 태그 추가"
                onKeyDown={handleEnterKey}
                form="no-form"
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addTag();
                }}
              >
                추가
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              취소
            </Button>
            <Button onClick={handleShare} disabled={isSubmitting}>
              {isSubmitting ? "공유 중..." : "공유하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
