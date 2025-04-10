"use client";

import styled from "styled-components";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Title from "antd/es/typography/Title";
import { Button, Input } from "antd";
import { BaseSteps, ReferenceType } from "@/types/threads";
import { usePostFirstSentence } from "@/hooks/mutations/usePostFirstSentence";
import { useUser } from "@/hooks/useUser";
import { useSetRecoilState } from "recoil";
import { firstSentenceState, referenceState } from "@/states/threadState";
import { useState } from "react";

const schema = z.object({
  reference: z.string().min(1, "필수"),
});

const GetFirstSentence = ({ step, setStep }: BaseSteps) => {
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

  const { userData } = useUser();

  const [tmpReference, setTmpReference] = useState({ reference: "" });
  const setFirstSentence = useSetRecoilState(firstSentenceState);
  const setReference = useSetRecoilState(referenceState);

  const onSubmit = (data: ReferenceType) => {
    console.log("폼 제출됨:", data);
    postFirstSentence({
      ...data,
      teamCode: userData.teamCode ?? "",
    });
    setTmpReference(data);
  };

  const { mutate: postFirstSentence } = usePostFirstSentence({
    onSuccess(res) {
      console.log("Success", res);
      setFirstSentence(res.data);
      setReference(tmpReference);
      setStep(3);
    },
    onError(e) {
      console.error("Failed", e);
    },
  });
  return (
    <Wrapper $isVisible={step >= 2}>
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
    </Wrapper>
  );
};

export default GetFirstSentence;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;
