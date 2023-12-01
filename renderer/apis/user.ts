import { defaultServer } from './settings';

interface ILoginToken {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export const login = async (authCode: string) => {
  const result = await defaultServer.post<ILoginToken>('api/v1/auth/kakao/login', { authCode });
  // token 값 로컬 스토리지에 저장
  localStorage.setItem('accessToken', result.data.accessToken);
  localStorage.setItem('refreshToken', result.data.refreshToken);
};

export const getUserInfo = async () => {
  const result = await defaultServer.get('api/v1/auth/kakao/info');
};

export const logout = async () => {
  const result = await defaultServer.get('api/v1/auth/kakao/logout');
  localStorage.clear();
};
