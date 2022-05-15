import axios from "axios";
import client from "apis/client";

export async function addLikeVideo(videoId: string, category: string) {
  try {
    const response = await client.post(`/likes/add`, null, {
      params: {
        category,
        id: videoId,
      },
    });
    //console.log(response);
    return response.data;
  } catch (e) {
    //console.log(e);
  }
}
export async function deleteLikeVideo(videoId: string) {
  try {
    const response = await client.delete(`/likes/delete?id=${videoId}`);
    //console.log(response);
    return response;
  } catch (e) {
    //console.log(e);
  }
}
