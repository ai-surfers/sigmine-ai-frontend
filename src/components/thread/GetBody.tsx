import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { Button, Flex } from "antd";
import { BaseSteps } from "@/types/threads";
import { useRecoilValue } from "recoil";
import { firstSentenceState, referenceState } from "@/states/threadState";
import Title from "antd/es/typography/Title";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { usePostFullContents } from "@/hooks/mutations/usePostFullContents";
import FinalResult from "./FinalResult";

const schema = z.object({
  selected: z.string().min(1, "하나 이상 선택해주세요!"),
});

type FormData = z.infer<typeof schema>;

const GetBody = ({ step }: BaseSteps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { selected: "" },
  });

  const firstSentences = useRecoilValue(firstSentenceState);
  const reference = useRecoilValue(referenceState);

  const [fullContent, setFullContent] = useState("");

  const { mutate: postFullContents } = usePostFullContents({
    onSuccess(res) {
      console.log("Success", res);
      setFullContent(res.data.full_contents);
    },
    onError(e) {
      console.error("Failed", e);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("선택된 항목:", data.selected);
    postFullContents({
      reference: reference.reference,
      first_sentence: data.selected,
    });
  };

  return (
    <Wrapper $isVisible={step >= 3}>
      <Flex vertical gap={30}>
        <Title level={5}>
          10개의 후보들 중에서 마음에 드는 첫 문장을 선택해주세요! 선택해주신 첫
          문장을 바탕으로 스레드 내용을 만들어 드릴게요{" "}
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="selected"
            control={control}
            render={({ field }) => (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {firstSentences.first_sentence_candidates.map(
                  (firstSentence) => (
                    <Button
                      key={firstSentence}
                      onClick={() => field.onChange(firstSentence)}
                      style={{
                        padding: 10,
                        border:
                          field.value === firstSentence
                            ? "2px solid blue"
                            : "1px solid gray",
                        background:
                          field.value === firstSentence ? "#e0f0ff" : "#fff",
                      }}
                    >
                      {firstSentence}
                    </Button>
                  )
                )}
              </div>
            )}
          />
          {errors.selected && (
            <p style={{ color: "red" }}>{errors.selected.message}</p>
          )}

          <Button htmlType="submit">스레드 내용 만들기</Button>
        </form>
        {fullContent.length > 1 && <FinalResult initialResult={fullContent} />}
      </Flex>
    </Wrapper>
  );
};

export default GetBody;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
