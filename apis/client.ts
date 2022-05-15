import axios from "axios";

axios.defaults.baseURL = 'http://3.36.157.185:80/api';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://3.36.157.185:80/api",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("intercepter error catch : ",error.response);
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      console.log(originalRequest);
      const refresh = localStorage.getItem("refresh");
      console.log("refresh 확인 : ", refresh);
      if(!refresh){
        return Promise.reject(error);
      }
      const data = await axios
        .get("/refresh-token", {
          headers:{
            "Authorization" : refresh!,
          }
        })
        .then((response) => response.data);
      const { accessToken, refreshToken } = data;
      console.log("access 재발급 :", accessToken);
      console.log("refresh 재발급 :", refreshToken);
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);
      client.defaults.headers.common.Authorization = `${accessToken}`;
      originalRequest.headers.Authorization = `${accessToken}`;
      return client(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default client;
