import { POST } from "@/apis/client";
import { BaseMutateResType, SettingParmsType } from "@/types/threads";
import { useMutation } from "@tanstack/react-query";

async function postSettings({ settings }: SettingParmsType) {
  const { data } = await POST<boolean>(`threads/settings`, settings, {});
  return data;
}

export const usePostSettings = ({
  onSuccess,
  onError,
}: BaseMutateResType<boolean>) => {
  return useMutation({
    mutationFn: ({ settings }: SettingParmsType) => postSettings({ settings }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
