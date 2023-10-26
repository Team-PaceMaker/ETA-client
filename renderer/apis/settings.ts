import axios from "axios";

// 이제 전역 객체 global.env를 통해 .env 파일의 환경 변수에 접근 가능
console.log(`DB Host: ${process.env.SERVER_URL}`);
console.log(`${process.env.ASD}`);
export const defaultServer = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

export const formDataServer = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Server Setting
defaultServer.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultServer.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
