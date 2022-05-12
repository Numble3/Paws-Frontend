import axios from "axios";

const client = axios.create({
  baseURL: "http://3.36.157.185/api",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response.status);
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      console.log(originalRequest);
      const data = await axios
        .post("/user/refresh")
        .then((response) => response.data);
      const { access_token } = data;
      originalRequest.headers.authorization = `Bearer ${access_token}`;
      return client(originalRequest);
    }
  }
);

export default client;
