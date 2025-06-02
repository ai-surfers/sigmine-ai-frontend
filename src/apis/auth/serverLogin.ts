"use server";

import { initialUserState } from "@/states/userState";
import { MeResponse, UserType } from "@/types/auth";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { deleteCookie } from "@/utils/cookieUtils";

export async function serverMe(accessToken: string): Promise<MeResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/identities/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "source-location": "web",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("로그인 실패");
  }

  const data = await res.json();

  return data.data;
}

export async function serverUserState(accessToken: string): Promise<UserType> {
  try {
    const res = await serverMe(accessToken);
    return {
      isLogin: true,
      nickname: res.nickname,
      email: res.email,
      picture: res.picture,
      email_verified: res.email_verified,
      joined_at: res.joined_at,
    };
  } catch (err) {
    // 로그인 실패 시 기본값 반환 (로그아웃 상태로 간주)
    return {
      isLogin: false,
      nickname: "",
      email: "",
      picture: "",
      email_verified: false,
      joined_at: "",
    };
  }
}
