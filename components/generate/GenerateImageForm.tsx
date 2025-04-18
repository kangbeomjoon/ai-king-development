"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { StyleOptions } from "./StyleOptions";
import { ImageGeneration } from "./ImageGeneration";
import { GeneratedImageActions } from "./GeneratedImageActions";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IStyleOptions, IGenerateResponse } from "@/types";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_STYLE_OPTIONS: IStyleOptions = {
  artStyle: "디지털아트",
  colorTone: "밝은",
};

const FETCH_TIMEOUT = 100000; // 100초

export function GenerateImageForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>(
    DEFAULT_STYLE_OPTIONS
  );
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  useEffect(() => {
    const urlPrompt = searchParams.get("prompt");
    if (urlPrompt) {
      setPrompt(decodeURIComponent(urlPrompt));
    }
  }, [searchParams]);

  // 컴포넌트 언마운트 시 진행 중인 요청 취소
  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [abortController]);

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    if (value.length > 500) {
      setError("500자 이내로 입력해 주세요");
    } else {
      setError("");
    }
  };

  const handleGenerate = async () => {
    if (!prompt) {
      setError("프롬프트를 입력해 주세요");
      return;
    }

    if (prompt.length > 500) {
      setError("500자 이내로 입력해 주세요");
      return;
    }

    // 이미 진행 중인 요청이 있다면 취소
    if (abortController) {
      abortController.abort();
    }

    // 새 AbortController 생성
    const controller = new AbortController();
    setAbortController(controller);

    try {
      setIsGenerating(true);
      setError("");

      // 타임아웃을 위한 Promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(
          () => reject(new Error("이미지 생성 시간이 초과되었습니다")),
          FETCH_TIMEOUT
        );
      });

      // 실제 API 요청 Promise
      const fetchPromise = fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          styleOptions,
        }),
        signal: controller.signal,
      });

      // Promise.race로 둘 중 먼저 완료되는 것 처리
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      const data: IGenerateResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "이미지 생성에 실패했습니다");
      }

      setGeneratedImageUrl(data.imageUrl);
      toast({
        title: "이미지 생성 완료",
        description: "이미지가 성공적으로 생성되었습니다.",
      });
    } catch (err) {
      // AbortError는 사용자가 의도적으로 취소한 경우이므로 별도 처리
      if (err instanceof DOMException && err.name === "AbortError") {
        console.log("이미지 생성 요청이 취소되었습니다");
        return;
      }

      const errorMessage =
        err instanceof Error
          ? err.message
          : "이미지 생성 중 오류가 발생했습니다";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "오류 발생",
        description: errorMessage,
      });
    } finally {
      setIsGenerating(false);
      setAbortController(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">프롬프트 입력</label>
        <Textarea
          value={prompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          placeholder="생성하고 싶은 이미지를 자세히 설명해주세요..."
          className="min-h-[100px]"
          disabled={isGenerating}
        />
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <StyleOptions options={styleOptions} onChange={setStyleOptions} />

      <ImageGeneration
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        generatedImageUrl={generatedImageUrl}
      />

      {generatedImageUrl && (
        <GeneratedImageActions
          imageUrl={generatedImageUrl}
          prompt={prompt}
          styleOptions={styleOptions}
        />
      )}
    </div>
  );
}
