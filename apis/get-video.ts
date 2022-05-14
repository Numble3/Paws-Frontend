import { VideoParams } from "./../types/video.d";
import axios from "axios";
axios.defaults.baseURL = "http://3.36.157.185:80/api";

export async function getVideos(params: VideoParams) {
  let { category, page, size, sortCondition, title } = params;

  let videoQuery: VideoParams = {
    page,
    size: 1,
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

  //console.log(videoQuery);
  try {
    const response = await axios.get("/videos", {
      params: videoQuery,
    });
    //console.log("결과: ", response);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function todayRanking({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  if (value === "etc") value = "others";
  try {
    if (value) {
      const response = await axios.get(`/likes/rank/day/${value}`);

      return response.data[label];
    } else {
      const response = await axios.get("/likes/rank/day");
      return response.data.ranking;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getVideoDetail(videoId: string) {
  try {
    const response = await axios.get(`/videos/${videoId}`);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
