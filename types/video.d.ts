//video detail
export type VideoType = {
  videoId: string;
  category: string;
  content: string;
  thumbnailUrl: string;
  title: string;
  type: string;
  videoDuration: number;
  videoUrl: string;
};

//video detail
export type VideoParamType = {
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
  profileUrl: string;
  thumbnailPath: string;
  title: string;
  videoId: number;
  view: number;
  category: "DOG" | "CAT" | "HAMSTER" | "LIZARD" | "BIRD" | "RABBIT" | "ETC";
};

//get video list params
export type VideoParams = {
  category?: string;
  page: number;
  size: number;
  sort?: string;
  title?: string;
};

export type LikeVideoList = {
  createdAt: string;
  like: number;
  nickname: string;
  thumbnailPath: string;
  title: string;
  videoId: number;
  view: number;
  thumbnailPath: string;
  profileUrl: string;
  videoType: string;
}



type VideoListWithLikes = {
  contents: VideoListType[];
  hasNext: boolean;
  likeVideoIds: number[];
};
