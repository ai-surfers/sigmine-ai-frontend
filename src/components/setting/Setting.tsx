"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Input, message, Spin } from "antd";
import Title from "antd/es/typography/Title";
import React, { Dispatch, SetStateAction, Suspense, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { usePostSettings } from "@/hooks/mutations/usePostSettings";

import { SettingType } from "@/types/threads";
import { useSettingsQuery } from "@/hooks/queries/useSettings";
import TextArea from "antd/es/input/TextArea";
import StepIndicator, { SETTING_STEPS, StepIndicatorType } from "../ui/Step";

const schema = z.object({
  persona: z.string().min(1, "필수"),
  examples: z.array(z.object({ content: z.string().min(1, "필수") })),
});

const Setting = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingType>({
    resolver: zodResolver(schema),
    defaultValues: {
      persona: "",
      examples: [{ content: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "examples",
    control,
  });

  const { mutate: postSettings } = usePostSettings({
    onSuccess(res) {
      console.log("Success", res);
      message.success("설정이 저장되었습니다.");
    },
    onError(e) {
      console.error("Failed", e);
    },
  });

  const onSubmit = (data: SettingType) => {
    console.log("폼 제출됨:", data);
    postSettings({ settings: data });
  };

  const { data, isLoading } = useSettingsQuery();

  // 기존 세팅값이 있을 경우 form에 세팅
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  if (isLoading) return <Spin />;

  return (
    <>
      <StepIndicator steps={SETTING_STEPS} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={60} style={{ width: "100%" }}>
          <div>
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
          </div>
          <div>
            <Title level={3}>스레드 예시 추가하기</Title>
            <Title level={4}>학습시키고 싶은 문제를 입력하세요</Title>
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{ display: "flex", gap: "8px", marginBottom: "8px" }}
              >
                <Controller
                  name={`examples.${index}.content`}
                  control={control}
                  render={({ field }) => (
                    <Flex gap={10} style={{ width: "100%" }} align="center">
                      <TextArea
                        {...field}
                        autoSize={{ minRows: 1, maxRows: 8 }}
                        placeholder="입력 값을 입력해주세요."
                      />
                      {errors.examples?.[index]?.content && (
                        <p style={{ color: "red" }}>
                          {errors.examples[index].content?.message}
                        </p>
                      )}
                      <Button onClick={() => remove(index)}>삭제</Button>
                    </Flex>
                  )}
                />
              </div>
            ))}
            <Button onClick={() => append({ content: "" })}>추가하기</Button>
            <Button htmlType="submit">저장</Button>
          </div>
        </Flex>
      </form>
    </>
  );
};

export default Setting;

const MessageWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
`;
