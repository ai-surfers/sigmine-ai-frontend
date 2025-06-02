import Login from "@/components/login";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { getCookie } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

export default function LoginPage() {
  if (!!getCookie(COOKIE_KEYS.TEAM_CODE)) redirect("/");

  return (
    <>
      <Login />
    </>
  );
}
