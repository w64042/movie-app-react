import axios from 'axios';
import { LoginInput } from '../pages/login.page';
import { RegisterInput } from '../pages/register.page';
import { GenericResponse, ILoginResponse, IUserResponse } from './types';

const BASE_URL = 'http://localhost:8000/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // add to every request bearer token from user
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>('auth/refresh');
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes('not logged in') && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return authApi(originalRequest);
    }
    if (error.response.data.message.includes('not refresh')) {
      document.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>('auth/register', user);
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  user.grant_type = 'password';
  user.client_id = '9948e82b-c746-420d-80de-eb28bd7c7f98';
  user.client_secret = '4jACmIAMAZzX9gktRphGk2LDyjlOPD9Xk3UMvGXM';
  const response = await authApi.post<ILoginResponse>('oauth/token', user);
  return response.data;
};

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>('auth/logout');
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>('api/v1/users/1');
  return response.data;
};
