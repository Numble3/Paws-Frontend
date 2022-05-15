import { VideoType } from "types/video";
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
    console.log("here");
    const response = await client.post("/images/resize", image, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    console.log(response.data.message);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function videoTransform(video: FormData) {
  try {
    const response = await client.post("/videos/storage", video, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(response.data);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createEmbedVideo(params: VideoType) {
  try {
    const response = await client.post("/videos", params);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
