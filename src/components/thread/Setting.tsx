"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { StepType } from ".";

const schema = z.object({
  persona: z.string().min(1, "필수"),
  example: z.array(z.object({ value: z.string().min(1, "필수") })),
});

type FormData = {
  persona: string;
  example: { value: string }[];
};

const Setting = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<StepType>>;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      persona: "",
      example: [{ value: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    name: "example",
    control,
  });

  const onSubmit = (data: FormData) => {
    console.log("폼 제출됨:", data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <MessageWrapper>
          <Title level={3}>스레드 페르소나 설정하기</Title>
          <Title level={4}>페르소나를 입력해주세요</Title>
          <Controller
            name="persona"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} placeholder="입력 값을 입력해주세요." />
                {errors.persona && (
                  <p style={{ color: "red" }}>{errors.persona.message}</p>
                )}
              </>
            )}
          />

          <Title level={3}>스레드 예시 추가하기</Title>
          <Title level={4}>학습시키고 싶은 문제를 입력하세요</Title>
          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
            >
              <Controller
                name={`example.${index}.value`}
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="입력 값을 입력해주세요." />
                    {errors.example?.[index]?.value && (
                      <p style={{ color: "red" }}>
                        {errors.example[index].value?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          ))}
          <Button onClick={() => append({ value: "" })}>추가하기</Button>
          <Button htmlType="submit">저장</Button>
        </MessageWrapper>
      </div>
    </form>
  );
};

export default Setting;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
