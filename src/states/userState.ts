import { UserType } from "@/types/auth";
import { atom } from "recoil";

export const initialUserState = {
  isLogin: false,
  teamName: null,
  teamCode: null,
};

export const userState = atom<UserType>({
  key: "userState",
  default: initialUserState,
});
