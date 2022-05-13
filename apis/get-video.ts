import axios from "axios";

axios.defaults.baseURL = "http://3.36.157.185:80/api";

type VideoParams = {
  category?: string;
  page: number;
  size: number;
  sortCondition?: string;
  title?: string;
};

export async function getVideos(params: VideoParams) {
  let { category, page, size, sortCondition, title } = params;

  let videoQuery: VideoParams = {
    page,
    size,
  };
  if (category) {
    if (category === "etc") category = "OTHERS";
    else if (category === "whole") return;
    videoQuery["category"] = category.toUpperCase();
  }
  if (sortCondition) {
    videoQuery["sortCondition"] = sortCondition;
  }
  if (title) {
    videoQuery["title"] = title;
  }

  const response = await axios.get("http://3.36.157.185/api/videos", {
    params: videoQuery,
  });
  return response.data;
}
