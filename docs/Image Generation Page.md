## 이미지 생성 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **파일 위치**: `app/generate/page.tsx`

1. **프롬프트 입력 필드**
   - **파일 위치**: `components/generate/GenerateImageForm.tsx`
   - **UI 구성**: 화면 상단에 배치된 텍스트 입력 필드로, ShadCN의 `Textarea` 컴포넌트를 사용해 메인 페이지에서 전달받은 프롬프트를 표시합니다.
   - **상호작용**: 사용자가 프롬프트를 수정하거나 더 자세한 설명을 추가할 수 있습니다.
   - **오류 처리**: 프롬프트 필드가 비어 있을 경우 "프롬프트를 입력해 주세요"라는 오류 메시지를 표시합니다.
   - **추가 사항**: 프롬프트 입력 필드 아래 작은 텍스트로 "구체적인 프롬프트일수록 더 정확한 이미지가 생성됩니다" 힌트를 표시합니다.
   - **유효성 검사**: 500자 제한이 있으며, 초과 시 오류 메시지를 표시합니다.

2. **스타일 옵션 선택 섹션**
   - **파일 위치**: `components/generate/StyleOptions.tsx`
   - **UI 구성**: 
     - 프롬프트 입력 필드 아래에 배치된 각종 스타일 옵션을 선택할 수 있는 섹션입니다.
     - ShadCN의 `Select` 컴포넌트를 활용합니다.
   - **스타일 옵션**:
     - **예술 스타일**: 디지털아트, 수채화, 유화, 펜화, 사실적, 추상적, 만화적 등의 옵션이 있는 `Select` 드롭다운
     - **색조**: 밝은, 어두운, 중간톤, 파스텔, 흑백 등의 옵션이 있는 `Select` 드롭다운
   - **상호작용**: 각 옵션을 선택하면 미리 설정된 값이 API 요청에 포함됩니다.

3. **생성 버튼**
   - **파일 위치**: `components/generate/ImageGeneration.tsx`
   - **UI 구성**: 스타일 옵션 선택 섹션 하단에 배치된 ShadCN의 `Button` 컴포넌트입니다.
   - **상호작용**: 
     - 클릭 시 설정된 프롬프트와 스타일 옵션으로 이미지 생성 함수를 호출합니다.
     - 로딩 중에는 버튼 상태가 비활성화되고 "이미지 생성 중..." 텍스트와 함께 로딩 아이콘이 표시됩니다.
   - **오류 처리**: 프롬프트가 비어있을 경우 버튼이 비활성화됩니다.

4. **로딩 애니메이션**
   - **파일 위치**: `components/generate/LoadingAnimation.tsx`
   - **UI 구성**: 
     - 이미지 생성 중일 때 표시되는 애니메이션 컴포넌트입니다.
     - 회전하는 로딩 아이콘과 "AI가 이미지를 그리는 중입니다..." 메시지를 표시합니다.
   - **애니메이션**: 부드러운 회전 애니메이션으로 사용자에게 진행 중임을 알립니다.

5. **생성된 이미지 결과 섹션**
   - **파일 위치**: `components/generate/ImageGeneration.tsx`
   - **UI 구성**: 
     - 이미지 생성 완료 후 표시되는 섹션으로, 생성된 이미지를 크게 표시합니다.
     - Next.js의 `Image` 컴포넌트를 사용하며, `priority` 속성으로 로딩 최적화가 적용되어 있습니다.

6. **이미지 액션 버튼**
   - **파일 위치**: `components/generate/GeneratedImageActions.tsx`
   - **UI 구성**: 
     - 이미지 아래에 "갤러리에 저장하기", "공유하기", "다운로드" 버튼을 배치합니다.
   - **상호작용**:
     - 갤러리에 저장하기: 클릭 시 사용자의 개인 갤러리에 이미지를 저장합니다. (현재는 데모 상태)
     - 공유하기: 클릭 시 공유 모달이 열립니다.
     - 다운로드: 클릭 시 이미지를 로컬 기기에 다운로드합니다. (실제 작동)

7. **다시 생성하기 버튼**
   - **파일 위치**: `components/generate/GenerateImageForm.tsx`
   - **UI 구성**: 생성된 이미지 위에 배치된 텍스트 버튼입니다.
   - **상호작용**: 클릭 시 현재 프롬프트와 스타일 옵션을 유지한 채 새로운 이미지를 생성합니다.

8. **공유 모달**
   - **파일 위치**: `components/generate/GeneratedImageActions.tsx` 내에 구현됨
   - **UI 구성**:
     - ShadCN의 `Dialog` 컴포넌트를 사용한 모달
     - 모달 상단: "커뮤니티에 공유하기" 제목
     - 게시물 제목 입력 필드 (`Input` 컴포넌트)
     - 추가 설명 입력 필드 (`Textarea` 컴포넌트, 선택 사항)
     - "공유하기" 및 "취소" 버튼
   - **상호작용**:
     - 공유하기: 입력된 정보와 함께 게시물 생성 함수를 호출합니다. (현재는 데모 상태)
     - 취소: 모달을 닫고 이전 화면으로 돌아갑니다.
   - **유효성 검사**: 제목이 비어있을 경우 오류 메시지를 표시합니다.

#### 2. 사용자 흐름 및 상호작용

1. **프롬프트 수정 및 스타일 옵션 설정**
   - 메인 페이지에서 전달받은 프롬프트를 수정하거나 그대로 사용합니다.
   - 스타일 옵션을 선택해 원하는 이미지 스타일을 설정합니다.
   
2. **이미지 생성 및 결과 확인**
   - "이미지 생성하기" 버튼을 클릭하면 버튼이 비활성화되고 로딩 애니메이션이 표시됩니다.
   - 이미지 생성이 완료되면 생성된 이미지가 화면에 표시됩니다.

3. **이미지 관리 옵션**
   - 생성된 이미지를 갤러리에 저장하거나 커뮤니티에 공유할 수 있습니다.
   - 로컬 기기에 이미지를 다운로드할 수 있습니다.
   - 공유 시에는 제목과 추가 설명을 입력한 후 게시물로 등록합니다.

4. **피드백 및 재생성**
   - 결과가 마음에 들지 않을 경우, "다시 생성하기" 버튼을 클릭해 동일한 프롬프트와 옵션으로 새 이미지를 생성할 수 있습니다.

---

### 백엔드 기능명세서 (현재는 목업 데이터로 구현됨)

#### 1. 이미지 생성 API (목업)

- **파일 위치**: `components/generate/GenerateImageForm.tsx` 내 handleGenerate 함수
- **동작 방식**: 현재는 타이머와 무작위 이미지 URL을 사용하여 API 응답을 시뮬레이션합니다.
- **향후 구현 시 요청 데이터**: 
```typescript
{
  prompt: string;
  styleOptions: {
    artStyle: string; // 예술 스타일 (예: "디지털아트", "수채화", "유화")
    colorTone: string; // 색감 (예: "밝은", "어두운", "중간톤")
  }
}
```
- **향후 구현 시 응답 데이터**: 
```typescript
{
  success: boolean;
  imageURL: string;
  message?: string; // 오류 발생 시 메시지
}
```

#### 2. 이미지 저장 API (목업)

- **파일 위치**: `components/generate/GeneratedImageActions.tsx` 내 handleSave 함수
- **동작 방식**: 현재는 토스트 메시지만 표시하여 저장 성공을 시뮬레이션합니다.
- **향후 구현 시 요청 데이터**: 
```typescript
{
  imageURL: string;
  prompt: string;
  styleOptions: {
    artStyle: string;
    colorTone: string;
  }
}
```
- **향후 구현 시 응답 데이터**: 
```typescript
{
  success: boolean;
  galleryItemId?: string;
  message?: string;
}
```

#### 3. 커뮤니티 공유 API (목업)

- **파일 위치**: `components/generate/GeneratedImageActions.tsx` 내 handleShareSubmit 함수
- **동작 방식**: 현재는 토스트 메시지만 표시하여 공유 성공을 시뮬레이션합니다.
- **향후 구현 시 요청 데이터**: 
```typescript
{
  imageURL: string;
  title: string;
  description?: string;
  prompt: string;
  styleOptions: {
    artStyle: string;
    colorTone: string;
  }
}
```
- **향후 구현 시 응답 데이터**: 
```typescript
{
  success: boolean;
  postId?: string;
  message?: string;
}
```

#### 4. 이미지 다운로드 기능 (실제 구현)

- **파일 위치**: `components/generate/GeneratedImageActions.tsx` 내 handleDownload 함수
- **동작 방식**: 이미지 URL에서 Blob 데이터를 가져와 브라우저의 다운로드 기능을 활용합니다.
- **구현 내용**:
  1. 이미지 URL에서 Blob 데이터 가져오기
  2. URL.createObjectURL을 사용하여 Blob URL 생성
  3. a 태그를 생성하고 download 속성 설정
  4. 프로그래매틱하게 클릭하여 다운로드 시작
  5. 사용이 끝난 리소스 정리 (Blob URL 해제)

#### 5. 데이터베이스 스키마 (향후 구현 시 참고)

```typescript
// GalleryItem 테이블
{
  id: string;
  userId: string;
  imageURL: string;
  prompt: string;
  artStyle: string;
  colorTone: string;
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
  artStyle: string;
  colorTone: string;
  likes: number;
  comments: number;
  createdAt: string;
}
``` 