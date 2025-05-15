"use server";

import { UserType } from "@/types/auth";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { deleteCookie } from "@/utils/cookieUtils";

export async function serverLogin(teamCode: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/teams/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "team-code": teamCode,
      "source-location": "web",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("로그인 실패");
  }

  const data = await res.json();
  return data;
}

export async function serverUserState(teamCode: string): Promise<UserType> {
  try {
    const res = await serverLogin(teamCode);

    return {
      isLogin: true,
      teamName: res.data.team_name,
    };
  } catch (err) {
    // 로그인 실패 시 기본값 반환 (로그아웃 상태로 간주)
    return {
      isLogin: false,
      teamName: "",
    };
  }
}
