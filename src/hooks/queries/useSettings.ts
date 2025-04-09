import { GET } from "@/apis/client";
import { SettingParmsType, SettingType } from "@/types/threads";
import { useQuery } from "@tanstack/react-query";

async function getSettings(teamCode: string) {
  const res = await GET<SettingType>(`/threads/settings`, {
    headers: {
      "team-code": teamCode,
    },
  });
  return res.data.data;
}

export const useSettingsQuery = (teamCode: string) => {
  return useQuery<SettingType>({
    queryKey: ["settings", teamCode],
    queryFn: () => getSettings(teamCode),
    enabled: !!teamCode,
  });
};
