import { GET } from "@/apis/client";
import { MeResponse } from "@/types/auth";

export async function getMe() {
  const res = await GET<MeResponse>(`/identities/me`);
  return res.data.data;
}
