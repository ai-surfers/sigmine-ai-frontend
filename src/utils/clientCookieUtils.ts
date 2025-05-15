// Keys
export enum COOKIE_KEYS {
  ACCESS_TOKEN = "access_token",
  TEAM_CODE = "team_code",
}

export function getClientCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie?.split("=")[1] ?? null;
}
