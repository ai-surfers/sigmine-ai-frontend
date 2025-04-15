"use client";

import { useRecoilState } from "recoil";
import { initialUserState, userState } from "../states/userState";

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
    setUserTeamName,
    setAccessToken,
    resetUserState,
  };
};
