import { POST } from "@/apis/client";
import {
  FirstSenteceParamsType,
  FirstSentenceResponseType,
  PostThreadsAsyncs,
} from "@/types/threads";
import { useMutation } from "@tanstack/react-query";

async function postFirstSentence({ reference }: FirstSenteceParamsType) {
  const { data } = await POST<FirstSentenceResponseType>(
    `/threads/first-sentence`,
    { reference }
  );
  return data;
}

export const usePostFirstSentence = ({
  onSuccess,
  onError,
}: PostThreadsAsyncs<FirstSentenceResponseType>) => {
  return useMutation({
    mutationFn: ({ reference }: FirstSenteceParamsType) =>
      postFirstSentence({ reference }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
