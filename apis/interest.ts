import client from "apis/client";

export async function addLikeVideo(videoId: string, category: string) {
  //console.log("videoId: ", videoId, ", category: ", category);
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
export async function deleteLikeVideo(videoId: string) {
  //console.log("videoId: ", videoId);
  try {
    const response = await client.delete("/likes/delete", {
      params: {
        id: videoId,
      },
    });
    //console.log(response.data);
    return response;
  } catch (e) {
    console.log(e);
  }
}
