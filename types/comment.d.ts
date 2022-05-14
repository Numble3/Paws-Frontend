export type CommentParams = {
  accountId?: number;
  sort: string;
  videoId: string;
  page: number;
  size: number;
};

export type CommentType = {
  profilePath?: string;
  nickname: string;
  createAt: string;
  like: string;
  commentId?: string;
  content: string;
};
