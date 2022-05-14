import axios from "axios";
import { CommentParams } from "types/comment";

axios.defaults.baseURL = "http://3.36.157.185:80/api";

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
    //console.log("결과: ", response);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
