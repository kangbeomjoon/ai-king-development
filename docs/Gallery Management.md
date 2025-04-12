## 갤러리 관리 및 커뮤니티 공유 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/gallery/page.tsx`

1. **갤러리 그리드 섹션**
   - **UI 구성**: 
     - 반응형 그리드 레이아웃 (1/2/3/4열 자동 조정)
     - 각 이미지는 1:1 비율의 카드 형태로 표시
     - 그리드 하단에 "더 이상 이미지가 없습니다" 메시지 표시
   - **이미지 카드 구성**:
     - 썸네일 이미지 (Next.js Image 컴포넌트 사용)
     - 생성 날짜
     - 카테고리 태그
     - 공개/비공개 상태 표시
   - **상호작용**:
     - 카드 호버 시 액션 버튼 표시 (공유, 삭제)
     - 카드 클릭 시 이미지 상세 모달 열기
     - 공유 버튼 클릭 시 공유 모달 열기 (이벤트 전파 방지)
     - 삭제 버튼 클릭 시 확인 다이얼로그 표시 (이벤트 전파 방지)
   - **접근성**:
     - 공유 및 삭제 버튼에 aria-label 적용

2. **필터 및 정렬 섹션**
   - **파일 위치**: `components/gallery/GalleryFilters.tsx`
   - **UI 구성**:
     - 카테고리 필터 (ShadCN Select 컴포넌트)
     - 날짜 범위 필터 (DatePickerWithRange 컴포넌트)
     - 정렬 옵션 (최신순, 오래된순, 이름순)
     - 공개/비공개 필터
     - 필터 초기화 버튼
   - **상호작용**:
     - 각 필터 변경 시 즉시 갤러리 목록에 실시간 반영
     - 필터 초기화 버튼 클릭 시 모든 필터를 기본값으로 재설정

3. **이미지 상세 모달**
   - **파일 위치**: `components/gallery/ImageDetailModal.tsx`
   - **UI 구성**:
     - 원본 이미지 표시
     - 프롬프트 정보
     - 스타일 옵션 정보 (아트 스타일, 색조)
     - 생성 날짜
     - 카테고리 표시
     - 태그 관리 (추가/삭제)
     - 공개/비공개 설정 토글
   - **상호작용**:
     - 태그 추가: 입력 필드에서 태그 입력 후 추가 버튼 클릭 또는 Enter 키
     - 태그 삭제: 태그 옆 'X' 버튼 클릭
     - 공개 설정 변경: 토글 스위치 클릭
     - 변경사항 저장: 변경 내용은 저장 버튼 클릭 시 적용되고 토스트 메시지로 알림

4. **커뮤니티 공유 모달**
   - **파일 위치**: `components/gallery/ShareModal.tsx`
   - **UI 구성**:
     - 제목 입력 필드 (필수 입력사항)
     - 설명 입력 필드 (선택사항)
     - 태그 관리 (추가/삭제)
     - 공유 버튼 및 취소 버튼
   - **상호작용**:
     - 제목 필드 유효성 검사: 비어있을 경우 오류 메시지 표시
     - 태그 추가/삭제: 입력 필드와 추가 버튼으로 태그 관리
     - 공유 버튼 클릭 시 로딩 상태 표시 및 공유 완료 후 토스트 알림
     - 성공 시 메인 페이지로 리디렉션

5. **헤더 부분**
   - **파일 위치**: `app/gallery/page.tsx`
   - **UI 구성**:
     - 페이지 제목 및 부제목
     - 새 이미지 생성 버튼 (메인 페이지로 이동)
   - **상호작용**:
     - 새 이미지 생성 버튼 클릭 시 메인 페이지로 이동

#### 2. 상태 관리

- **파일 위치**: `store/gallery.ts`
- **상태 관리 도구**: Zustand
- **주요 상태 및 기능**:
  1. **이미지 상태 관리**
     - `images`: 전체 갤러리 이미지 목록
     - `filteredImages`: 필터링된 이미지 목록
     - `deleteImage`: 이미지 삭제 기능
     - `resetImages`: 이미지 목록 초기화 기능
     - `updateImageMetadata`: 이미지 메타데이터 업데이트 기능
     - `toggleImagePublic`: 이미지 공개 설정 토글 기능
     - `updateImageTags`: 이미지 태그 관리 기능
  
  2. **필터 상태 관리**
     - `filters`: 현재 적용된 필터 상태
     - `setFilter`: 필터 설정 기능
     - `resetFilters`: 필터 초기화 기능
     - 필터 유형: 카테고리, 날짜 범위, 정렬 기준, 공개 여부

#### 3. 사용자 흐름

1. **갤러리 관리 프로세스**
   ```
   갤러리 페이지 진입 → 필터/정렬 적용 → 이미지 카드 선택 
   → 이미지 상세 모달에서 정보 확인/수정 → 변경사항 저장 → 토스트 알림
   ```

2. **이미지 삭제 프로세스**
   ```
   삭제 버튼 클릭 → 확인 다이얼로그 표시 → 확인 시 삭제 
   → 토스트 알림 표시 → 이미지 목록 자동 업데이트
   ```

3. **커뮤니티 공유 프로세스**
   ```
   공유 버튼 클릭 → 공유 모달 열기 → 제목/설명/태그 입력
   → 공유 버튼 클릭 → 로딩 상태 표시 → 성공 시 토스트 알림 및 메인 페이지로 이동
   ```

4. **이미지 필터링 프로세스**
   ```
   필터 선택 (카테고리/날짜/정렬/공개 여부) → 실시간으로 이미지 목록 필터링 적용
   → 필요 시 필터 초기화 버튼으로 모든 필터 재설정
   ```

---

### 백엔드 기능명세서

#### 1. 갤러리 이미지 관리 API

- **파일 위치**: `app/api/gallery/route.ts`
- **엔드포인트**:
  1. **이미지 목록 조회**
     - **HTTP 메서드**: `GET`
     - **쿼리 파라미터**:
       ```typescript
       interface IGalleryQuery {
           page?: number
           limit?: number
           category?: string
           startDate?: string
           endDate?: string
           sortBy?: 'latest' | 'oldest' | 'name'
           visibility?: 'public' | 'private' | 'all'
       }
       ```
     - **응답 데이터**:
       ```typescript
       interface IGalleryResponse {
           images: IGalleryImage[]
           totalCount: number
           hasMore: boolean
       }
       ```

  2. **이미지 저장**
     - **HTTP 메서드**: `POST`
     - **요청 데이터**:
       ```typescript
       interface ISaveImageRequest {
           imageUrl: string
           prompt: string
           styleOptions: {
               artStyle: string
               colorTone: string
           }
       }
       ```
     - **응답 데이터**:
       ```typescript
       interface ISaveImageResponse {
           success: boolean
           image: IGalleryImage
       }
       ```

  3. **이미지 삭제**
     - **HTTP 메서드**: `DELETE`
     - **경로**: `/api/gallery/[imageId]`
     - **응답 데이터**:
       ```typescript
       interface IDeleteResponse {
           success: boolean
           message: string
       }
       ```

  4. **이미지 정보 수정**
     - **HTTP 메서드**: `PATCH`
     - **경로**: `/api/gallery/[imageId]`
     - **요청 데이터**:
       ```typescript
       interface IUpdateImageRequest {
           tags?: string[]
           isPublic?: boolean
       }
       ```
     - **응답 데이터**:
       ```typescript
       interface IUpdateImageResponse {
           success: boolean
           image?: IGalleryImage
       }
       ```

#### 2. 커뮤니티 공유 API

- **파일 위치**: `app/api/community/share/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
  ```typescript
  interface ISharePostRequest {
      imageId: string
      title: string
      description?: string
      tags?: string[]
  }
  ```
- **응답 데이터**:
  ```typescript
  interface ISharePostResponse {
      success: boolean
      postId?: string
      error?: string
  }
  ```

#### 3. 데이터베이스 스키마

```typescript
// GalleryImage 테이블
{
  id: string
  userId: string
  imageUrl: string
  prompt: string
  styleOptions: {
    artStyle: string
    colorTone: string
  }
  categories: string[]
  tags: string[]
  isPublic: boolean
  order: number
  createdAt: string
  updatedAt: string
}

// Category 테이블
{
  id: string
  userId: string
  name: string
  createdAt: string
}

// Post 테이블 (커뮤니티 공유)
{
  id: string
  imageId: string
  userId: string
  title: string
  description?: string
  tags: string[]
  likesCount: number
  commentsCount: number
  createdAt: string
  updatedAt: string
}
```

#### 4. 에러 처리

- **에러 코드**:
  - `INVALID_REQUEST`: 잘못된 요청 파라미터
  - `NOT_FOUND`: 이미지를 찾을 수 없음
  - `UNAUTHORIZED`: 권한 없음
  - `UPDATE_FAILED`: 정보 업데이트 실패
  - `SHARE_FAILED`: 커뮤니티 공유 실패

- **에러 응답 형식**:
  ```typescript
  interface IErrorResponse {
    success: false
    error: {
      code: string
      message: string
    }
  }
  ```

#### 5. 프론트엔드-백엔드 연동 로직

1. **갤러리 이미지 목록 로드**
   - 프론트엔드: 갤러리 페이지 진입 시 `resetImages` 함수 호출
   - 실제 구현 시: `GET /api/gallery` API 호출로 이미지 목록 로드

2. **이미지 삭제**
   - 프론트엔드: `deleteImage` 함수 호출 및 UI 업데이트
   - 실제 구현 시: `DELETE /api/gallery/[imageId]` API 호출

3. **이미지 메타데이터 업데이트**
   - 프론트엔드: `updateImageMetadata`, `toggleImagePublic`, `updateImageTags` 함수 호출
   - 실제 구현 시: `PATCH /api/gallery/[imageId]` API 호출

4. **이미지 커뮤니티 공유**
   - 프론트엔드: 공유 모달에서 정보 입력 후 '공유하기' 버튼 클릭
   - 실제 구현 시: `POST /api/community/share` API 호출 후 피드 페이지로 이동 