import { BaseResponse, POST } from "@/apis/client";
import { PostThreadsAsyncs, SettingParmsType } from "@/types/threads";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

async function postSettings({ settings }: SettingParmsType) {
  const { data } = await POST<boolean>(`threads/settings`, settings, {});
  return data;
}

export const usePostSettings = ({
  onSuccess,
  onError,
}: PostThreadsAsyncs<boolean>) => {
  return useMutation({
    mutationFn: ({ settings }: SettingParmsType) => postSettings({ settings }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
