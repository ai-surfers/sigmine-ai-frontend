export interface LoginResponse {
  team_name: string;
}

export type UserType = {
  isLogin: boolean;
  teamName: string | null;
};
