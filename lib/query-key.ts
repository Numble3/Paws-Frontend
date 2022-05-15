import { getUsaerDetailAPI, getUserVideosAPI } from "apis/accounts";
import { getUserInfoAPI, logInAPI } from "apis/auth";
import { getAllLikeVideosAPI } from "apis/like";

export const QUERY_KEY = {
  login: { key: "login", api: logInAPI },
  likesAll: { key: "likesAll", api: getAllLikeVideosAPI },
  user: { key: "user", api: getUserInfoAPI },
  userDetail: { key: "user-detail", api: getUsaerDetailAPI },
  videos: { key: "videos", api: getUserVideosAPI },
};
