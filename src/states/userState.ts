import { LoginResponse } from "@/types/auth";
import { atom } from "recoil";

type UserType = {
  isLogin: boolean;
  user: LoginResponse | null;
};

export const initialUserState = {
  isLogin: false,
  user: null,
};

export const userState = atom<UserType>({
  key: "userState",
  default: initialUserState,
});
