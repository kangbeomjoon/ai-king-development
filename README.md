This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables:

```bash
# 기본 환경 변수
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_postgres_connection_string
REPLICATE_API_TOKEN=your_replicate_api_token

# 개발 테스트 모드 (인증 없이 API 사용)
ENABLE_TEST_MODE=true # 개발 환경에서만 작동
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase 설정

### 스토리지 버킷 설정
1. Supabase 대시보드에서 `Storage` 메뉴로 이동
2. `images` 이름의 새 버킷 생성
3. 버킷의 RLS(Row Level Security) 정책 설정
   - 읽기: 모든 사용자가 읽을 수 있도록 설정
   - 쓰기: 인증된 사용자만 가능하도록 설정

### 데이터베이스 마이그레이션
```bash
# Drizzle 마이그레이션 파일 생성
npx drizzle-kit generate

# 마이그레이션 적용
npx drizzle-kit push
```

## 사용된 기술

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **AI Image Generation**: Replicate API

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
