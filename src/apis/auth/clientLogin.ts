"use client";

import { LoginResponse } from "@/types/auth";
import { POST } from "../client";

export async function login(token: string) {
  return await POST<LoginResponse>(`/identities/tokens/google`, {
    access_token: token,
  });
}

// team code로 로그인시, 구글 로그인 도입으로 deprecated
export async function routedLogin(
  teamCode: string
): Promise<{ teamName: string }> {
  const res = await fetch(`/api/login?teamCode=${teamCode}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok || !data.success) throw new Error("로그인 실패");

  return { teamName: data.teamName };
}

export async function routedLogout() {
  const res = await fetch(`/api/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok || !data.success) throw new Error("로그아웃 실패");

  return true;
}
