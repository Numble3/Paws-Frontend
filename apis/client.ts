import axios from "axios";

axios.defaults.baseURL = "https://paws-api.ga/api";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "https://paws-api.ga/api",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        return Promise.reject(error);
      }
      const data = await axios
        .get("/refresh-token", {
          headers: {
            Authorization: refresh!,
          },
        })
        .then((response) => response.data);
        console.log("로그인 갱신 : ", data);
      const { accessToken } = data;
      localStorage.setItem("access", accessToken);
      client.defaults.headers.common.Authorization = `${accessToken}`;
      originalRequest.headers.Authorization = `${accessToken}`;
      return client(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default client;
