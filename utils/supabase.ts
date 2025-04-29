import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Supabase 클라이언트 생성 함수
export const createSupabaseClient = async () => {
  const clerkAuth = await auth();
  // 'supabase' 템플릿을 사용하여 JWT 토큰 가져오기
  const clerkToken = await clerkAuth.getToken({
    template: "supabase",
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 환경 변수 로깅 (개발 환경에서만)
  if (process.env.NODE_ENV === "development") {
    if (!supabaseUrl) {
      console.warn("NEXT_PUBLIC_SUPABASE_URL 환경 변수가 설정되지 않았습니다.");
    }
    if (!supabaseKey) {
      console.warn(
        "NEXT_PUBLIC_SUPABASE_ANON_KEY 환경 변수가 설정되지 않았습니다."
      );
    }
  }

  // 환경 변수가 없으면 null 반환
  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "Supabase 환경 변수가 누락되어 클라이언트를 생성할 수 없습니다."
    );
    return null;
  }

  try {
    // Supabase 클라이언트 생성
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey,
      {
        auth: {
          persistSession: false, // 서버 사이드에서는 세션 유지 필요 없음
        },
        global: {
          headers: {
            Authorization: `Bearer ${clerkToken}`,
          },
        },
      }
    );

    return client;
  } catch (error) {
    console.error("Supabase 클라이언트 생성 중 오류 발생:", error);
    return null;
  }
};
