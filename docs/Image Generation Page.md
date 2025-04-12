## 이미지 생성 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/generate/page.tsx`

1. **프롬프트 입력 필드**
   - **UI 구성**: 화면 상단에 배치된 텍스트 입력 필드로, ShadCN의 `Textarea` 컴포넌트를 사용해 메인 페이지에서 전달받은 프롬프트를 표시합니다.
   - **상호작용**: 사용자가 프롬프트를 수정하거나 더 자세한 설명을 추가할 수 있습니다.
   - **오류 처리**: 프롬프트 필드가 비어 있을 경우 "프롬프트를 입력해 주세요"라는 오류 메시지를 표시합니다.
   - **추가 사항**: 프롬프트 입력 필드 아래 작은 텍스트로 "구체적인 프롬프트일수록 더 정확한 이미지가 생성됩니다" 힌트를 표시합니다.

2. **스타일 옵션 선택 섹션**
   - **파일 위치**: `components/StyleOptions.tsx`
   - **UI 구성**: 
     - 프롬프트 입력 필드 아래에 배치된 각종 스타일 옵션을 선택할 수 있는 섹션입니다.
     - ShadCN의 `Select`, `Slider`, `RadioGroup` 컴포넌트를 활용합니다.
   - **스타일 옵션**:
     - **색감**: 밝은/어두운/중간톤 선택 가능한 `RadioGroup`
     - **그림 스타일**: 사실적/추상적/만화적 등의 옵션이 있는 `Select` 드롭다운
     - **디테일 레벨**: 낮음-높음 사이의 값을 조절할 수 있는 `Slider`
     - **분위기**: 따뜻한/차가운/중립적 선택 가능한 `RadioGroup`
   - **상호작용**: 각 옵션을 선택하면 미리 설정된 값이 API 요청에 포함됩니다.
   - **시각적 피드백**: 옵션 변경 시 작은 아이콘이나 색상으로 현재 선택된 옵션을 직관적으로 표시합니다.

3. **생성 버튼**
   - **UI 구성**: 스타일 옵션 선택 섹션 하단에 배치된 ShadCN의 `Button` 컴포넌트로, 브랜드 메인 색상(#4A90E2)을 사용합니다.
   - **상호작용**: 
     - 클릭 시 설정된 프롬프트와 스타일 옵션으로 이미지 생성 API를 호출합니다.
     - 로딩 중에는 버튼 상태가 비활성화되고 "생성 중..." 텍스트로 변경됩니다.
   - **오류 처리**: 프롬프트가 비어있을 경우 버튼이 비활성화됩니다.

4. **로딩 애니메이션**
   - **파일 위치**: `components/LoadingAnimation.tsx`
   - **UI 구성**: 
     - 이미지 생성 중일 때 표시되는 애니메이션 컴포넌트입니다.
     - 회전하는 로딩 아이콘과 "AI가 이미지를 그리는 중입니다..." 메시지를 표시합니다.
   - **애니메이션**: 부드러운 회전 애니메이션으로 사용자에게 진행 중임을 알립니다.

5. **생성된 이미지 결과 섹션**
   - **파일 위치**: `components/GeneratedImage.tsx`
   - **UI 구성**: 
     - 이미지 생성 완료 후 표시되는 섹션으로, 생성된 이미지를 크게 표시합니다.
     - 이미지 아래에 "갤러리에 저장" 및 "커뮤니티에 공유" 버튼을 배치합니다.
   - **상호작용**:
     - 갤러리에 저장: 클릭 시 사용자의 개인 갤러리에 이미지를 저장합니다.
     - 커뮤니티에 공유: 클릭 시 공유 모달이 열립니다.
   - **추가 기능**: 이미지를 클릭하면 원본 크기로 볼 수 있는 모달 창이 열립니다.

6. **공유 모달**
   - **파일 위치**: `components/ShareModal.tsx`
   - **UI 구성**:
     - 모달 상단: "커뮤니티에 공유하기" 제목
     - 게시물 제목 입력 필드
     - 추가 설명 입력 필드(선택 사항)
     - "공유하기" 및 "취소" 버튼
   - **상호작용**:
     - 공유하기: 입력된 정보와 함께 게시물 생성 API를 호출합니다.
     - 취소: 모달을 닫고 이전 화면으로 돌아갑니다.

#### 2. 사용자 흐름 및 상호작용

1. **프롬프트 수정 및 스타일 옵션 설정**
   - 메인 페이지에서 전달받은 프롬프트를 수정하거나 그대로 사용합니다.
   - 스타일 옵션을 선택해 원하는 이미지 스타일을 설정합니다.
   
2. **이미지 생성 및 결과 확인**
   - "생성" 버튼을 클릭하면 로딩 애니메이션이 표시됩니다.
   - 이미지 생성이 완료되면 생성된 이미지가 화면에 표시됩니다.

3. **이미지 저장 및 공유**
   - 생성된 이미지를 갤러리에 저장하거나 커뮤니티에 공유할 수 있습니다.
   - 공유 시에는 제목과 추가 설명을 입력한 후 게시물로 등록합니다.

4. **피드백 및 재생성**
   - 결과가 마음에 들지 않을 경우, 스타일 옵션을 변경하고 재생성할 수 있습니다.
   - 생성된 이미지 아래에 "다시 생성하기" 버튼을 통해 프롬프트와 옵션을 유지한 채 다시 시도할 수 있습니다.

---

### 백엔드 기능명세서

#### 1. 이미지 생성 API

- **파일 위치**: `app/api/generate-image/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**: 
```typescript
{
  prompt: string;
  style: string; // 그림 스타일 (예: "realistic", "abstract", "cartoon")
  colorTone: string; // 색감 (예: "light", "dark", "neutral")
  detailLevel: number; // 디테일 레벨 (1-10 범위의 숫자)
  mood: string; // 분위기 (예: "warm", "cool", "neutral")
}
```
- **응답 데이터**: 
```typescript
{
  success: boolean;
  imageURL: string;
  message?: string; // 오류 발생 시 메시지
}
```

#### 2. 이미지 저장 API

- **파일 위치**: `app/api/gallery/save/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**: 
```typescript
{
  imageURL: string;
  prompt: string;
  styleOptions: {
    style: string;
    colorTone: string;
    detailLevel: number;
    mood: string;
  }
}
```
- **응답 데이터**: 
```typescript
{
  success: boolean;
  galleryItemId?: string;
  message?: string;
}
```

#### 3. 커뮤니티 공유 API

- **파일 위치**: `app/api/community/post/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**: 
```typescript
{
  imageURL: string;
  title: string;
  description?: string;
  prompt: string;
  styleOptions: {
    style: string;
    colorTone: string;
    detailLevel: number;
    mood: string;
  }
}
```
- **응답 데이터**: 
```typescript
{
  success: boolean;
  postId?: string;
  message?: string;
}
```

#### 4. 데이터베이스 스키마

```typescript
// GalleryItem 테이블
{
  id: string;
  userId: string;
  imageURL: string;
  prompt: string;
  style: string;
  colorTone: string;
  detailLevel: number;
  mood: string;
  createdAt: string;
}

// Post 테이블 (커뮤니티 게시물)
{
  id: string;
  userId: string;
  imageURL: string;
  title: string;
  description: string;
  prompt: string;
  style: string;
  colorTone: string;
  detailLevel: number;
  mood: string;
  likes: number;
  comments: number;
  createdAt: string;
}
``` 