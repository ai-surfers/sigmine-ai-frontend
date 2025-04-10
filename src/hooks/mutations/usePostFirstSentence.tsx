import { POST } from "@/apis/client";
import {
  FirstSenteceParamsType,
  FirstSentenceResponseType,
  PostThreadsAsyncs,
} from "@/types/threads";
import { useMutation } from "@tanstack/react-query";

async function postFirstSentence({
  reference,
  teamCode,
}: FirstSenteceParamsType) {
  const { data } = await POST<FirstSentenceResponseType>(
    `/threads/first-sentence`,
    { reference },
    {
      headers: { "team-code": teamCode },
    }
  );
  return data;
}

export const usePostFirstSentence = ({
  onSuccess,
  onError,
}: PostThreadsAsyncs<FirstSentenceResponseType>) => {
  return useMutation({
    mutationFn: ({ reference, teamCode }: FirstSenteceParamsType) =>
      postFirstSentence({ reference, teamCode }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
