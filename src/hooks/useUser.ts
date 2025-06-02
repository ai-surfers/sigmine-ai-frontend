"use client";

import { useRecoilState } from "recoil";
import { initialUserState, userState } from "../states/userState";

/**
 * useUser Hook
 */

export const useUser = () => {
  const [userData, setUserData] = useRecoilState(userState);

  const setUserName = (name: string) => {
    setUserData((prevState) => ({
      ...prevState,
      isLogin: true,
      name: name,
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
    setUserName,
    setAccessToken,
    resetUserState,
  };
};
