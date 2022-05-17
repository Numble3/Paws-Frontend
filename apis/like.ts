import client from "./client";

/* 관심영상 카테고리 별 조회 */
export async function getLikeVideosAPI(
  category: string,
  lastId: number,
  size: number
) {
  return await client
    .get("/likes", {
      params: {
        category: category,
        id: lastId,
        size: size,
      },
    })
    .then((response) => {
      return response.data;
    });
}

export function getAllLikeVideosAPI() {
  return client.get("/likes/all").then((response) => response.data);
}

