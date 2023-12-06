import { ILoginToken } from 'types/user';
import { defaultServer } from './settings';

export const login = async (authCode: string) => {
  const result = await defaultServer.post<ILoginToken>('api/v1/auth/kakao/login', { authCode });
  localStorage.setItem('accessToken', result.data.accessToken);
  localStorage.setItem('refreshToken', result.data.refreshToken);
};

export const getUserInfo = async () => {
  const result = await defaultServer.get('api/v1/auth/kakao/info');
  return result.data;
};

export const logout = async () => {
  await defaultServer.post('api/v1/auth/kakao/logout');
  localStorage.clear();
};

export const getUserGraph = async (week: number) => {
  const result = await defaultServer.get(`api/v1/my/day/${week}`);
  return result.data;
};
