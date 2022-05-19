import client from "./client";

export async function signUpAPI(data: {
  email: string;
  nickname: string;
  password: string;
}) {
  return await client.post("/sign-up", data).then((response) => {
    return response.data;
  });
}

export async function logInAPI(data: { email: string; password: string }) {
  return await client.post("/sign-in", data).then((response) => {
    const { accessToken } = response.data;
    console.log(accessToken);
    client.defaults.headers.common.Authorization = `${accessToken}`;
    return response.data;
  });
}

export async function getUserInfoAPI() {
  return await client.get("/accounts").then((response) => response.data);
}

export async function logOutAPI() {
  return await client.get("/logout").then((response) => response.data);
}

export async function withDrawAPI() {
  return await client.delete("/withdrawal").then((response) => response.data);
}
