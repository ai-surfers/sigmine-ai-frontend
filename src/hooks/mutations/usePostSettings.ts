import { BaseResponse, POST } from "@/apis/client";
import { PostThreadsAsyncs, SettingParmsType } from "@/types/threads";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function postSettings({ settings, teamCode }: SettingParmsType) {
  const { data } = await POST<boolean>(`threads/settings`, settings, {
    headers: {
      "team-code": teamCode,
    },
  });
  return data;
}

export const usePostSettings = ({
  onSuccess,
  onError,
}: PostThreadsAsyncs<boolean>) => {
  return useMutation({
    mutationFn: ({ settings, teamCode }: SettingParmsType) =>
      postSettings({ settings, teamCode }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
