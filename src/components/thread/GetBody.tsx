import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { Button, Flex, Spin } from "antd";
import { RefType } from "@/types/threads";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  firstSentenceState,
  referenceState,
  stepState,
} from "@/states/threadState";
import Title from "antd/es/typography/Title";
import { usePostFullContents } from "@/hooks/mutations/usePostFullContents";
import FinalResult from "./FinalResult";
import { useScrollBottom } from "@/hooks/useScrollBottom";

const schema = z.object({
  selected: z.string().min(1, "하나 이상 선택해주세요!"),
});

type FormData = z.infer<typeof schema>;

const GetBody = ({ scrollRef }: RefType) => {
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
  const [step, setStep] = useRecoilState(stepState);

  const [fullContent, setFullContent] = useState("");
  const scrollToBottom = useScrollBottom(scrollRef);

  const postFullContents = usePostFullContents({
    onSuccess(res) {
      console.log("Success", res);
      setFullContent(res.data.full_contents);
    },
    onError(e) {
      console.error("Failed", e);
    },
  });

  const onSubmit = (data: FormData) => {
    setStep({ step: 2 });
    console.log("선택된 항목:", data.selected);
    postFullContents.mutate({
      reference: reference.reference,
      first_sentence: data.selected,
    });
  };

  useEffect(() => {
    if (postFullContents.isPending) {
      scrollToBottom();
    }
  }, [postFullContents]);

  useEffect(() => {
    if (step.step === 2) {
      setFullContent(""); // ✅ 결과 초기화
    }
  }, [step]);

  return (
    <Wrapper $isVisible={step.step >= 2}>
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
        {postFullContents.isPending && <Spin />}
        {!postFullContents.isPending && fullContent.length > 1 && (
          <FinalResult
            initialResult={fullContent}
            scrollToBottom={scrollToBottom}
          />
        )}
      </Flex>
    </Wrapper>
  );
};

export default GetBody;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
