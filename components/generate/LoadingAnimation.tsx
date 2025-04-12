import { Loader2 } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
      <p className="text-lg text-center text-muted-foreground">
        AI가 이미지를 그리는 중입니다...
      </p>
      <p className="text-sm text-center text-muted-foreground mt-2">
        몇 초 정도 소요될 수 있습니다.
      </p>
    </div>
  );
}
