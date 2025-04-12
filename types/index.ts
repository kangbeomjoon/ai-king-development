export interface IPost {
  postId: string;
  imageURL: string;
  userName: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  prompt?: string;
  createdAt?: string;
  userProfile?: string;
}

export interface IComment {
  id: string;
  postId: string;
  userName: string;
  content: string;
  createdAt: string;
  userProfile: string;
}

export interface IGenerateImageResponse {
  success: boolean;
  imageURL: string;
}

// CommentsModal props interface
export interface ICommentsModalProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialComments?: IComment[];
  onCommentAdded?: () => void;
}

// CommunityFeedCard props interface
export interface ICommunityFeedCardProps {
  feedItem: IPost;
}

// 피드 아이템 인터페이스 (CommunityFeedCard에서 사용)
export interface IFeedItem {
  postId: string;
  imageURL: string;
  userName: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}
