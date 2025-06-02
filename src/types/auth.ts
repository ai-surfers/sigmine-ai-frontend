export interface LoginResponse {
  access_token: string;
}

export type UserType = {
  isLogin: boolean;
  name: string | null;
};
