import Home from "@/components/home";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { getCookie } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

export default function Root() {
  if (!getCookie(COOKIE_KEYS.ACCESS_TOKEN)) redirect("/login");

  return (
    <div>
      <Home />
    </div>
  );
}
