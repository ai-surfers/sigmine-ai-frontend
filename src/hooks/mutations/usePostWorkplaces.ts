import { POST } from "@/apis/client";
import { BaseMutateResType } from "@/types/threads";
import {
  PostWorkspaceParamType,
  PostWorkspaceResType,
} from "@/types/workspaces";
import { useMutation } from "@tanstack/react-query";

async function postWorkspaces(param: PostWorkspaceParamType) {
  const { data } = await POST<PostWorkspaceResType>(`/workspaces`, param);
  return data;
}

export const usePostWorkspaces = ({
  onSuccess,
  onError,
}: BaseMutateResType<PostWorkspaceResType>) => {
  return useMutation({
    mutationFn: (params: PostWorkspaceParamType) => postWorkspaces(params),
    onSuccess: onSuccess,
    onError: onError,
  });
};
