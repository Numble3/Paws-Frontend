import client from "apis/client";

export async function addLikeVideo(videoId: string, category: string) {
  try {
    const response = await client.post(`/likes/add`, null, {
      params: {
        category,
        id: videoId,
      },
    });
    return response.data;
  } catch (e) {}
}
export async function deleteLikeVideo(videoId: string) {
  try {
    const response = await client.delete(`/likes/delete?id=${videoId}`);
    return response;
  } catch (e) {}
}
