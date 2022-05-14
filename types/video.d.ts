//video detail
export type VideoType = {
  category: string;
  content: string;
  thumbnailUrl: string;
  title: string;
  type: string;
  videoDuration: number;
  videoUrl: string;
};

//video list
export type VideoListType = {
  createdAt: string;
  like: number;
  nickname: string;
  thumbnailPath: string;
  title: string;
  videoId: number;
  view: number;
};

//get video list params
export type VideoParams = {
  category?: string;
  page: number;
  size: number;
  sortCondition?: string;
  title?: string;
};
