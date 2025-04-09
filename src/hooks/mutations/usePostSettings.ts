import { BaseResponse, POST } from "@/apis/client";
import { SettingParmsType } from "@/types/threads";
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

export interface PostSettingAsyncs {
  onSuccess: (res: BaseResponse<boolean>) => void;
  onError: (e: AxiosError) => void;
}

export const usePostSettings = ({ onSuccess, onError }: PostSettingAsyncs) => {
  return useMutation({
    mutationFn: ({ settings, teamCode }: SettingParmsType) =>
      postSettings({ settings, teamCode }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
