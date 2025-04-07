"use client";

import styled from "styled-components";
import { StepType } from ".";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import Title from "antd/es/typography/Title";
import { Button, Input } from "antd";

const schema = z.object({
  firstSentence: z.string().min(1, "필수"),
});

type FormData = {
  firstSentence: string;
};

export interface BaseSteps {
  step: StepType;
  setStep: Dispatch<SetStateAction<StepType>>;
}

const GetFirstSentence = ({ step, setStep }: BaseSteps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstSentence: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("폼 제출됨:", data);
    setStep(4);
  };
  return (
    <Wrapper $isVisible={step >= 3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title level={3}>스레드 첫 문장 만들기</Title>
        <Title level={4}>내용을 간단하게 입력해주세요</Title>
        <Controller
          name="firstSentence"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="입력 값을 입력해주세요." />
              {errors.firstSentence && (
                <p style={{ color: "red" }}>{errors.firstSentence.message}</p>
              )}
            </>
          )}
        />
        <Button htmlType="submit">생성하기</Button>
      </form>
    </Wrapper>
  );
};

export default GetFirstSentence;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
