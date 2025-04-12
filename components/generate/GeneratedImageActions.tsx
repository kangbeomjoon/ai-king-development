import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Download, Save, Share2 } from "lucide-react";
import { IGeneratedImageActionsProps } from "@/types";
import { useToast } from "@/hooks/use-toast";

export function GeneratedImageActions({
  imageUrl,
  prompt,
  styleOptions,
}: IGeneratedImageActionsProps) {
  const { toast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareTitle, setShareTitle] = useState("");
  const [shareDescription, setShareDescription] = useState("");

  const handleSave = async () => {
    toast({
      title: "저장 완료",
      description: "이미지가 갤러리에 저장되었습니다.",
    });
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleShareSubmit = () => {
    if (!shareTitle.trim()) {
      toast({
        variant: "destructive",
        title: "제목을 입력해주세요",
        description: "게시물 제목은 필수 입력 항목입니다.",
      });
      return;
    }

    // 목업 데이터: 실제 API 연동 시 대체 필요
    setTimeout(() => {
      toast({
        title: "공유 완료",
        description: "이미지가 커뮤니티에 공유되었습니다.",
      });
      setShareDialogOpen(false);
      setShareTitle("");
      setShareDescription("");
    }, 1000);
  };

  const handleDownload = async () => {
    try {
      // 이미지 URL에서 Blob 가져오기
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Blob URL 생성
      const blobUrl = window.URL.createObjectURL(blob);

      // 다운로드 링크 생성 및 클릭
      const link = document.createElement("a");
      link.href = blobUrl;

      // 파일명 생성 (현재 시간 기준)
      const timestamp = new Date().getTime();
      link.download = `generated-image-${timestamp}.jpg`;

      // 링크 클릭하여 다운로드 시작
      document.body.appendChild(link);
      link.click();

      // cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast({
        title: "다운로드 완료",
        description: "이미지가 다운로드되었습니다.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        variant: "destructive",
        title: "다운로드 실패",
        description: "이미지 다운로드 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={handleSave} variant="outline">
          <Save className="mr-2 h-4 w-4" />
          갤러리에 저장하기
        </Button>
        <Button onClick={handleShare} variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          공유하기
        </Button>
        <Button onClick={handleDownload} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          다운로드
        </Button>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>커뮤니티에 공유하기</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                게시물 제목
              </label>
              <Input
                id="title"
                value={shareTitle}
                onChange={(e) => setShareTitle(e.target.value)}
                placeholder="제목을 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                추가 설명 (선택사항)
              </label>
              <Textarea
                id="description"
                value={shareDescription}
                onChange={(e) => setShareDescription(e.target.value)}
                placeholder="게시물에 대한 추가 설명을 입력하세요"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleShareSubmit}>공유하기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
