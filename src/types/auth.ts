export interface LoginResponse {
  access_token: string;
}

export interface MeResponse {
  nickname: string;
  email: string;
  picture: string;
  email_verified: boolean;
  joined_at: string;
}

export interface UserType extends MeResponse {
  isLogin: boolean;
}
