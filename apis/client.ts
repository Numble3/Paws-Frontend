import axios from "axios";

axios.defaults.baseURL = 'http://3.36.157.185/api';
axios.defaults.withCredentials = true;

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
        .get("/refresh-token")
        .then((response) => response.data);
      const { accessToken } = data;
      originalRequest.headers.authorization = `Bearer ${accessToken}`;
      return client(originalRequest);
    }
  }
);

export default client;
