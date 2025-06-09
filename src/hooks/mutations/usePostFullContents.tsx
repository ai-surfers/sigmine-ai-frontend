import { POST } from "@/apis/client";
import {
  FullContentParamsType,
  FullContentResponseType,
  BaseMutateResType,
} from "@/types/threads";
import { useMutation } from "@tanstack/react-query";

async function postFullContents({
  first_sentence,
  reference,
}: FullContentParamsType) {
  const { data } = await POST<FullContentResponseType>(
    `/threads/full-contents`,
    {
      first_sentence,
      reference,
    }
  );
  return data;
}

export const usePostFullContents = ({
  onSuccess,
  onError,
}: BaseMutateResType<FullContentResponseType>) => {
  return useMutation({
    mutationFn: ({ first_sentence, reference }: FullContentParamsType) =>
      postFullContents({ first_sentence, reference }),
    onSuccess: onSuccess,
    onError: onError,
  });
};
