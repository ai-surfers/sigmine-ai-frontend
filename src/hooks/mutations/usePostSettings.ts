import { BaseResponse, POST } from "@/apis/client";
import { PostSettingData } from "@/components/thread/Setting";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface PostSettingProps {
  settings: PostSettingData;
  teamCode: string;
}

async function postSettings({ settings, teamCode }: PostSettingProps) {
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
    mutationFn: ({ settings, teamCode }: PostSettingProps) =>
      postSettings({ settings, teamCode }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
