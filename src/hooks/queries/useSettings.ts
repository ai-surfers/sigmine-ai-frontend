import { GET } from "@/apis/client";
import { SettingType } from "@/types/threads";
import { useQuery } from "@tanstack/react-query";

async function getSettings() {
  const res = await GET<SettingType>(`/threads/settings`, {});
  return res.data.data;
}

export const useSettingsQuery = () => {
  return useQuery<SettingType>({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
};
