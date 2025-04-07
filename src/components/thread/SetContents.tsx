"use client";

import styled from "styled-components";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "antd/es/typography/Title";
import { Button, Input } from "antd";
import { BaseSteps } from "./GetFirstSentence";

const schema = z.object({
  contents: z.string().min(1, "필수"),
});

type FormData = {
  contents: string;
};

const SetContents = ({ step, setStep }: BaseSteps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contents: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("폼 제출됨:", data);
    setStep(3);
  };
  return (
    <Wrapper $isVisible={step >= 2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title level={3}>스레드 콘텐츠 만들기</Title>
        <Title level={4}>어떤 내용으로 글을 써볼까요?</Title>
        <Controller
          name="contents"
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="입력 값을 입력해주세요." />
              {errors.contents && (
                <p style={{ color: "red" }}>{errors.contents.message}</p>
              )}
            </>
          )}
        />
        <Button htmlType="submit">생성하기</Button>
      </form>
    </Wrapper>
  );
};

export default SetContents;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
