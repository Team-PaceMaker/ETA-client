import { defaultServer } from './settings';

export const login = async (authCode: string) => {
  const result = await defaultServer.post('api/v1/auth/kakao/login', { authCode });
};
