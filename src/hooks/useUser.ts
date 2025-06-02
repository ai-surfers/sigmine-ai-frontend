"use client";

import { useRecoilState } from "recoil";
import { initialUserState, userState } from "../states/userState";
import { MeResponse } from "@/types/auth";

/**
 * useUser Hook
 */

export const useUser = () => {
  const [userData, setUserData] = useRecoilState(userState);

  const setUser = (newState: MeResponse) => {
    setUserData((prevState) => ({
      ...prevState,
      isLogin: true,
      name: newState.nickname,
      email: newState.email,
      email_verified: newState.email_verified,
      joined_at: newState.joined_at,
      picture: newState.picture,
    }));
  };

  const setAccessToken = (token: string | null) => {
    setUserData((prevState) => ({
      ...prevState,
      accessToken: token,
    }));
  };

  const resetUserState = () => {
    setUserData(initialUserState);
  };

  return {
    userData,
    setUser,
    setAccessToken,
    resetUserState,
  };
};
