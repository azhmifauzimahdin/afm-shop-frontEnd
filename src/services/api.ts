import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8000/api",
});

httpRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true;
      // try {
      //   const refreshToken = localStorage.getItem("ACCESS_TOKEN");
      //   const response = await httpRequest.post("/api/refresh", {
      //     refreshToken,
      //   });
      //   const { token } = response.data;
      //   localStorage.setItem("ACCESS_TOKEN", token);
      //   originalRequest.headers.Authorization = `Bearer ${token}`;
      //   return axios(originalRequest);
      // } catch (error) {
      //   console.log(error);
      //   return navigate("/login");
      // }
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
