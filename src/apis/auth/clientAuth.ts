"use client";

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
