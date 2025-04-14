export interface LoginResponse {
  team_name: string;
}

export type UserType = {
  isLogin: boolean;
  accessToken: string | null;
  teamName: string | null;
};
