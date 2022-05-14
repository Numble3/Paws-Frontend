import { VideoParams } from "./../types/video.d";
import axios from "axios";

axios.defaults.baseURL = "http://3.36.157.185:80/api";

export async function getVideos(params: VideoParams) {
  let { category, page, size, sortCondition, title } = params;

  let videoQuery: VideoParams = {
    page,
    size,
  };
  if (category && category !== "whole") {
    if (category === "etc") category = "OTHERS";
    videoQuery["category"] = category.toUpperCase();
  }
  if (sortCondition) {
    videoQuery["sortCondition"] = sortCondition.toUpperCase();
  }
  if (title) {
    videoQuery["title"] = title.toUpperCase();
  }
  try {
    const response = await axios.get("http://3.36.157.185/api/videos", {
      params: videoQuery,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
