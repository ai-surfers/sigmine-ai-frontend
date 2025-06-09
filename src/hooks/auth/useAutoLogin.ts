import { login } from "@/hooks/queries/useLogin";
import { useUser } from "@/hooks/useUser";
import {
  getLocalStorage,
  LOCALSTORAGE_KEYS,
  removeLocalStorage,
} from "@/utils/storageUtils";
import { message } from "antd";
import { useEffect } from "react";
export const useAutoLogin = () => {
  const { setUserTeamName, resetUserState } = useUser();

  useEffect(() => {
    const teamCode = getLocalStorage(LOCALSTORAGE_KEYS.TEAM_CODE);
    console.log(">> ", teamCode);

    if (teamCode) {
      login(teamCode)
        .then((res) => {
          const { team_name } = res.data;
          console.log(team_name);
          //   if (!success) {
          //     console.log("유저 조회에 실패하였습니다.");

          //     removeLocalStorage(LOCALSTORAGE_KEYS.TEAM_CODE);
          //     resetUserState();
          //     return;
          //   }

          // 성공, 저장
          setUserTeamName(team_name);
        })
        .catch((error) => {
          // 🔹 401 Unauthorized일 경우 로그아웃 처리
          if (error.response?.status === 401) {
            message.error("세션이 만료되었습니다. 다시 로그인해주세요.");
            removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
            resetUserState();
          } else {
            console.log("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          }
        });
    }
  }, []);
};
