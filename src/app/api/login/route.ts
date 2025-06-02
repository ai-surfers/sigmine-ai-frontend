import { NextRequest, NextResponse } from "next/server";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json();

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "토큰 필요" },
      { status: 400 }
    );
  }

  try {
    const res = new NextResponse(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
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
