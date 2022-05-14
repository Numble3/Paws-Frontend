import client from "./client";
import { VideoType } from "types/video";
import axios from "axios";

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

// accessToken 필요
export async function imageResize(image: File) {
  try {
    const { data } = await client.post("/images/resize", image);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function videoTransform(video: File) {
  try {
    const { data } = await client.post("/video/storage", video);
    return data;
  } catch (e) {
    console.log(e);
  }
}
export async function createEmbedVideo(datas: VideoType) {
  try {
    const { data } = await client.post("/videos", datas);
    return data;
  } catch (e) {
    console.log(e);
  }
}
