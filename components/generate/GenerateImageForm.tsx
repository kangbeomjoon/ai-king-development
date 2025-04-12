"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { StyleOptions } from "./StyleOptions";
import { ImageGeneration } from "./ImageGeneration";
import { GeneratedImageActions } from "./GeneratedImageActions";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IStyleOptions } from "@/types";

const DEFAULT_STYLE_OPTIONS: IStyleOptions = {
  artStyle: "디지털아트",
  colorTone: "밝은",
};

export function GenerateImageForm() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [styleOptions, setStyleOptions] = useState<IStyleOptions>(
    DEFAULT_STYLE_OPTIONS
  );
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // URL의 프롬프트 파라미터를 읽어와 초기값으로 설정
  useEffect(() => {
    const urlPrompt = searchParams.get("prompt");
    console.log("URL 프롬프트 파라미터:", urlPrompt);

    if (urlPrompt) {
      const decodedPrompt = decodeURIComponent(urlPrompt);
      console.log("디코딩된 프롬프트:", decodedPrompt);
      setPrompt(decodedPrompt);
    }
  }, [searchParams]);

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

    setIsGenerating(true);
    // 목업 데이터: 실제 API 연동 시 대체 필요
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setGeneratedImageUrl("https://picsum.photos/800/600");
    setIsGenerating(false);
  };

  const handleRegenerateImage = async () => {
    setIsGenerating(true);
    // 목업 데이터: 실제 API 연동 시 대체 필요
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setGeneratedImageUrl(
      "https://picsum.photos/800/600?random=" + Math.random()
    );
    setIsGenerating(false);
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
        />
        <p className="text-xs text-muted-foreground mt-1">
          구체적인 프롬프트일수록 더 정확한 이미지가 생성됩니다.
        </p>
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
        isPromptEmpty={!prompt.trim()}
      />

      {generatedImageUrl && !isGenerating && (
        <>
          <div className="flex justify-center mb-4">
            <button
              onClick={handleRegenerateImage}
              className="text-primary hover:underline text-sm"
            >
              다시 생성하기
            </button>
          </div>
          <GeneratedImageActions
            imageUrl={generatedImageUrl}
            prompt={prompt}
            styleOptions={styleOptions}
          />
        </>
      )}
    </div>
  );
}
