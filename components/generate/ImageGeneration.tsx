import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { IImageGenerationProps } from "@/types";
import { LoadingAnimation } from "./LoadingAnimation";

export function ImageGeneration({
  onGenerate,
  isGenerating,
  generatedImageUrl,
  isPromptEmpty,
}: IImageGenerationProps) {
  return (
    <div className="space-y-4">
      <Button
        onClick={onGenerate}
        disabled={isGenerating || isPromptEmpty}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            이미지 생성 중...
          </>
        ) : (
          "이미지 생성하기"
        )}
      </Button>

      {isGenerating && <LoadingAnimation />}

      {!isGenerating && generatedImageUrl && (
        <div className="relative aspect-square w-full max-w-2xl mx-auto">
          <Image
            src={generatedImageUrl}
            alt="Generated image"
            fill
            className="object-contain"
            priority
          />
        </div>
      )}
    </div>
  );
}
