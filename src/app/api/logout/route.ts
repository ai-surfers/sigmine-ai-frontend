import { NextResponse } from "next/server";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";

export async function POST() {
  const res = new NextResponse(null, { status: 200 });
  res.cookies.set(COOKIE_KEYS.TEAM_CODE, "", {
    path: "/",
    maxAge: 0,
  });
  return res;
}
