"use client";

import { useRecoilState } from "recoil";
import { initialUserState, userState } from "../states/userState";
import { LoginResponse } from "@/types/auth";

/**
 * useUser Hook
 */

export const useUser = () => {
  const [userData, setUserData] = useRecoilState(userState);

  const setUserTeamName = (teamName: string) => {
    setUserData((prevState) => ({
      ...prevState,
      isLogin: true,
      teamName: teamName,
    }));
  };

  const setUserTeamCode = (teamCode: string | null) => {
    setUserData((prevState) => ({
      ...prevState,
      teamCode: teamCode,
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
    setUserTeamName,
    setUserTeamCode,
    // setAccessToken,
    resetUserState,
  };
};
