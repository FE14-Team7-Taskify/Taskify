import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
};

api.interceptors.request.use(requestInterceptor);

const responseInterceptorForError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    // 토큰 만료로 로그아웃 처리(API 헤더 토큰 제거)
    const requestInterceptor = (config: InternalAxiosRequestConfig) => {
      config.headers['Authorization'] = '';
      localStorage.clear();
      return config;
    };
    api.interceptors.request.use(requestInterceptor);
  }
  return Promise.reject(error);
};

api.interceptors.response.use((res) => res, responseInterceptorForError);

export default api;
