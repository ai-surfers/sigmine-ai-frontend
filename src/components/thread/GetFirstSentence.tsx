"use client";

import styled from "styled-components";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "antd/es/typography/Title";
import { Button, Flex, Input, Spin } from "antd";
import { ReferenceType, RefType } from "@/types/threads";
import { usePostFirstSentence } from "@/hooks/mutations/usePostFirstSentence";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  firstSentenceState,
  referenceState,
  stepState,
} from "@/states/threadState";
import { useEffect, useState } from "react";
import { useScrollBottom } from "@/hooks/useScrollBottom";

const schema = z.object({
  reference: z.string().min(1, "필수"),
});

const GetFirstSentence = ({ scrollRef }: RefType) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReferenceType>({
    resolver: zodResolver(schema),
    defaultValues: {
      reference: "",
    },
  });

  const [tmpReference, setTmpReference] = useState({ reference: "" });
  const setFirstSentence = useSetRecoilState(firstSentenceState);
  const setReference = useSetRecoilState(referenceState);
  const [step, setStep] = useRecoilState(stepState);

  const onSubmit = (data: ReferenceType) => {
    setStep({ step: 1 });
    console.log("폼 제출됨:", data);
    postFirstSentence.mutate({
      ...data,
    });
    setTmpReference(data);
  };

  const postFirstSentence = usePostFirstSentence({
    onSuccess(res) {
      console.log("Success", res);
      setFirstSentence(res.data);
      setReference(tmpReference);
      setStep({ step: 2 });
    },
    onError(e) {
      console.error("Failed", e);
    },
  });

  const scrollToBottom = useScrollBottom(scrollRef);

  useEffect(() => {
    if (postFirstSentence.isPending) {
      scrollToBottom();
    }
  }, [postFirstSentence.isPending]);

  return (
    <Wrapper $isVisible={step.step >= 1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title level={3}>스레드 첫 문장 만들기</Title>
        <Title level={4}>내용을 간단하게 입력해주세요</Title>
        <Controller
          name="reference"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="입력 값을 입력해주세요." />
              {errors.reference && (
                <p style={{ color: "red" }}>{errors.reference.message}</p>
              )}
            </>
          )}
        />
        <Button htmlType="submit">생성하기</Button>
      </form>
      {postFirstSentence.isPending && (
        <Flex justify="center" style={{ width: "100%", height: "100px" }}>
          <Spin />
        </Flex>
      )}
    </Wrapper>
  );
};

export default GetFirstSentence;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
