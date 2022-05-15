import client from "apis/client";

export async function imageResizeAPI(data: FormData) {
  return await client
    .post("/images/resize", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    });
}

export async function userUpdateAPI(data: {
  nickname: string;
  profile: string;
}) {
  return await client
    .post("/accounts/update", data)
    .then((response) => response.data);
}

export async function getUsaerDetailAPI() {
  return await client.get("/accounts/detail").then((response) => response.data);
}

export async function getUserVideosAPI() {
  return await client.get("/accounts/videos").then((response) => response.data);
}
