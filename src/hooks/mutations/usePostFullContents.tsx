import { POST } from "@/apis/client";
import {
  FullContentParamsType,
  FullContentResponseType,
  PostThreadsAsyncs,
} from "@/types/threads";
import { useMutation } from "@tanstack/react-query";

async function postFullContents({
  teamCode,
  first_sentence,
  reference,
}: FullContentParamsType) {
  const { data } = await POST<FullContentResponseType>(
    `/threads/full-contents`,
    {
      first_sentence,
      reference,
    },
    {
      headers: {
        "team-code": teamCode,
      },
    }
  );
  return data;
}

export const usePostFullContents = ({
  onSuccess,
  onError,
}: PostThreadsAsyncs<FullContentResponseType>) => {
  return useMutation({
    mutationFn: ({
      teamCode,
      first_sentence,
      reference,
    }: FullContentParamsType) =>
      postFullContents({ teamCode, first_sentence, reference }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
