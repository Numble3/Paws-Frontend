import { VideoParamType, VideoType } from "types/video";
import axios from "axios";
import client from "apis/client";

export async function checkEmbedLink(link: string) {
  const URL = "https://www.youtube.com/oembed?url=";
  try {
    const res = await axios.get(URL + link);
    if (res.data) {
      return true;
    }
  } catch (e) {
    return false;
  }
}

export async function imageResize(image: FormData) {
  try {
    const response = await client.post("/images/resize", image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {}
}

export async function videoTransform(video: FormData) {
  try {
    const response = await axios.post(
      "http://3.36.157.185:8081/api/videos/storage",
      video,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("access")}`,
          withCredentials: true,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createVideo(params: VideoParamType) {
  try {
    const response = await client.post("/videos", params);
    return response.data;
  } catch (e) {}
}

export async function updateVideo(params: VideoParamType, videoId: string) {
  console.log(params);

  try {
    const response = await client.put(`/videos/${videoId}`, params);
    return response.data;
  } catch (e) {}
}
