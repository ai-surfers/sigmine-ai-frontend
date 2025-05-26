import { NextRequest, NextResponse } from "next/server";
import { serverLogin } from "../../../apis/auth/serverLogin";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";

export async function GET(req: NextRequest) {
  const teamCode = req.nextUrl.searchParams.get("teamCode");

  if (!teamCode) {
    return NextResponse.json(
      { success: false, message: "teamCode 누락" },
      { status: 400 }
    );
  }

  try {
    const loginRes = await serverLogin(teamCode);

    const res = new NextResponse(
      JSON.stringify({
        success: true,
        teamName: loginRes.data.team_name,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.cookies.set(COOKIE_KEYS.TEAM_CODE, loginRes.data.team_code, {
      httpOnly: false,
      secure: process.env.APP_ENV !== "local",
      sameSite: process.env.APP_ENV === "local" ? "lax" : "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
