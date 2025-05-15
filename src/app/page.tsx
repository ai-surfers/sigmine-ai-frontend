import Thread from "@/components/thread";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { getCookie } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

export default function Root() {
  if (!getCookie(COOKIE_KEYS.TEAM_CODE)) redirect("/login");

  return (
    <div>
      <Thread />
    </div>
  );
}
