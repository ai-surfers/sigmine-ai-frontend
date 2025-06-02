import Login from "@/components/login";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { getCookie } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

export default function Home() {
  if (!!getCookie(COOKIE_KEYS.ACCESS_TOKEN)) redirect("/");

  return (
    <>
      <Login />
    </>
  );
}
