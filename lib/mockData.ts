import { IFeedItem, IComment } from "@/types";

// 커뮤니티 피드 목업 데이터
export const mockFeedData: IFeedItem[] = [
  {
    postId: "1",
    imageURL: "https://picsum.photos/seed/1/400",
    userName: "디자이너민지",
    likes: 124,
    comments: 23,
  },
  {
    postId: "2",
    imageURL: "https://picsum.photos/seed/2/400",
    userName: "그림쟁이철수",
    likes: 89,
    comments: 12,
  },
  {
    postId: "3",
    imageURL: "https://picsum.photos/seed/3/400",
    userName: "AI마스터",
    likes: 211,
    comments: 35,
  },
  {
    postId: "4",
    imageURL: "https://picsum.photos/seed/4/400",
    userName: "예술가영희",
    likes: 67,
    comments: 8,
  },
  {
    postId: "5",
    imageURL: "https://picsum.photos/seed/5/400",
    userName: "창작자태호",
    likes: 156,
    comments: 27,
  },
  {
    postId: "6",
    imageURL: "https://picsum.photos/seed/6/400",
    userName: "그림쟁이수진",
    likes: 92,
    comments: 14,
  },
  {
    postId: "7",
    imageURL: "https://picsum.photos/seed/7/400",
    userName: "디자인킹",
    likes: 178,
    comments: 32,
  },
  {
    postId: "8",
    imageURL: "https://picsum.photos/seed/8/400",
    userName: "AI아티스트",
    likes: 145,
    comments: 19,
  },
];

// 단일 게시물 상세 목업 데이터 가져오기
export function getMockPostDetail(postId: string) {
  const feedItem = mockFeedData.find((item) => item.postId === postId);

  if (!feedItem) {
    return null;
  }

  return {
    ...feedItem,
    userProfile: `https://i.pravatar.cc/150?u=${feedItem.userName}`,
    createdAt: new Date().toISOString(),
    prompt:
      "푸른 바다 위를 날아가는 하얀 드래곤, 몽환적인 분위기, 환상적인 전경",
    styleOptions: {
      style: "판타지",
      colorScheme: "블루 톤",
      lighting: "신비로운 조명",
    },
    scraps: Math.floor(feedItem.likes * 0.6),
    isLiked: Math.random() > 0.5,
    isScrapped: Math.random() > 0.7,
  };
}

// 댓글 목업 데이터
export function getMockComments(postId: string): IComment[] {
  return [
    {
      id: `${postId}-comment-1`,
      postId: postId,
      content:
        "멋진 작품이네요! 어떤 프롬프트를 사용하셨는지 공유해주실 수 있나요?",
      userName: "호기심많은질문자",
      userProfile: "https://i.pravatar.cc/150?u=questioner",
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
    },
    {
      id: `${postId}-comment-2`,
      postId: postId,
      content:
        "색감이 정말 아름답습니다. 저도 비슷한 작품을 만들어보고 싶어요!",
      userName: "색감러버",
      userProfile: "https://i.pravatar.cc/150?u=colorlover",
      createdAt: new Date(Date.now() - 7200000).toISOString(), // 2시간 전
    },
    {
      id: `${postId}-comment-3`,
      postId: postId,
      content: "와우! 정말 환상적인 이미지네요. 디테일이 놀랍습니다.",
      userName: "감탄하는팬",
      userProfile: "https://i.pravatar.cc/150?u=amazedfan",
      createdAt: new Date(Date.now() - 10800000).toISOString(), // 3시간 전
    },
  ];
}
