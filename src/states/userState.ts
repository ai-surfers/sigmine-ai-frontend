import { UserType } from "@/types/auth";
import { atom } from "recoil";

export const initialUserState = {
  isLogin: false,
  nickname: "",
  email: "",
  picture: "",
  email_verified: false,
  joined_at: "",
};

export const userState = atom<UserType>({
  key: "userState",
  default: initialUserState,
});
