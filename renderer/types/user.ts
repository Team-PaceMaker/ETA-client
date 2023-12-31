export interface IUser {
  accessToken: string;
  id: number;
  name: string;
  userRole: string;
}

export interface ILoginToken {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

export interface IFocusPoint {
  date: Date;
  attentionTime: number;
}
