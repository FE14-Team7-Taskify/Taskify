import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 요청 인터셉터: 토큰 붙이기
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    // Next.js 서버사이드 방어
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const token = user.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

// ❗️ 기존 에러 인터셉터 유지
const responseInterceptorForError = async (error: AxiosError) => {
  if (error.response?.status === 401) {
    // 토큰 만료시 localStorage 비우기
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
