import { LoginResponse } from "@/types/auth";
import { atom } from "recoil";

type UserType = {
  isLogin: boolean;
  teamCode: string | null;
  teamName: string | null;
};

export const initialUserState = {
  isLogin: false,
  teamCode: null,
  teamName: null,
};

export const userState = atom<UserType>({
  key: "userState",
  default: initialUserState,
});
