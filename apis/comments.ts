import axios from "axios";
import { CommentParams } from "types/comment";
import client from "apis/client";

export async function getComments(params: CommentParams) {
  let { accountId, sort, videoId, page, size } = params;

  let commentQuery: CommentParams = {
    sort,
    videoId,
    page,
    size,
  };
  if (accountId) commentQuery["accountId"] = accountId;

  try {
    const response = await axios.get(`/videos/${videoId}/comments`, {
      params: commentQuery,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postComments(videoId: string, content: string) {
  try {
    const response = await client.post(`/videos/${videoId}/comments`, content, {
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function likeComment(videoId: string, category: string) {
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
    console.log(e);
  }
}
