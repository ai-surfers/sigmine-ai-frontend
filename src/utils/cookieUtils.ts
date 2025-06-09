import { cookies } from "next/headers";
import { COOKIE_KEYS } from "./clientCookieUtils";

export function getCookie(key: COOKIE_KEYS) {
  return cookies().get(key)?.value ?? "";
}

export function deleteCookie(key: COOKIE_KEYS) {
  cookies().delete(key);
}
