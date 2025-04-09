import { LoginResponse } from "@/types/auth";
import { atom } from "recoil";

type UserType = {
  isLogin: boolean;
  teamCode: string | null;
  user: LoginResponse | null;
};

export const initialUserState = {
  isLogin: false,
  teamCode: null,
  user: null,
};

export const userState = atom<UserType>({
  key: "userState",
  default: initialUserState,
});
