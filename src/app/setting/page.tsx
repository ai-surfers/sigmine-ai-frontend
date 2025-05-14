import Setting from "@/components/setting/Setting";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { getCookie } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";

export default function SettingPage() {
  if (!getCookie(COOKIE_KEYS.TEAM_CODE)) redirect("/login");
  return (
    <>
      <Setting />
    </>
  );
}
