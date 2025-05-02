import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 생성 함수 - 서비스 롤 키 사용
export const createSupabaseClient = async () => {
    // 서비스 롤 키를 사용하여 Supabase 클라이언트 생성
    // 주의: 서비스 롤 키는 서버 측에서만 사용해야 합니다
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}

// 클라이언트 측에서 사용할 Supabase 클라이언트 생성 함수
export const createBrowserSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
