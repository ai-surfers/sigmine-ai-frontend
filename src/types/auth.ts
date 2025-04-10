export interface LoginResponse {
  team_name: string;
}

export type UserType = {
  isLogin: boolean;
  teamCode: string | null;
  teamName: string | null;
};
