"use client";

import { useRecoilState } from "recoil";
import { initialUserState, userState } from "../states/userState";
import { LoginResponse } from "@/types/auth";

/**
 * useUser Hook
 */

export const useUser = () => {
  const [userData, setUserData] = useRecoilState(userState);

  const setUser = (userData: LoginResponse | null) => {
    setUserData((prevState) => ({
      ...prevState,
      isLogin: true,
      user: userData,
    }));
  };

  // const setAccessToken = (token: string | null) => {
  //     setUserData((prevState) => ({
  //         ...prevState,
  //         accessToken: token,
  //     }));
  // };

  const resetUserState = () => {
    setUserData(initialUserState);
  };

  return {
    userData,
    setUser,
    // setAccessToken,
    resetUserState,
  };
};
