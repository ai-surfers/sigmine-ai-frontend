"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { StepType } from ".";
import { usePostSettings } from "@/hooks/mutations/usePostSettings";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { SettingType } from "@/types/threads";
import { useSettingsQuery } from "@/hooks/queries/useSettings";

const schema = z.object({
  persona: z.string().min(1, "필수"),
  examples: z.array(z.object({ content: z.string().min(1, "필수") })),
});

const Setting = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<StepType>>;
}) => {
  const { userData } = useUser();
  const router = useRouter();

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

  const { fields, append } = useFieldArray({
    name: "examples",
    control,
  });

  const { mutate: postSettings } = usePostSettings({
    onSuccess(res) {
      console.log("Success", res);
      setStep(2);
    },
    onError(e) {
      console.error("Failed", e);
    },
  });

  const onSubmit = (data: SettingType) => {
    console.log("폼 제출됨:", data);
    postSettings({ settings: data, teamCode: userData.teamCode ?? "" });
  };

  const { data } = useSettingsQuery(userData.teamCode ?? "");

  useEffect(() => {
    if (!userData?.teamCode) {
      router.push("/"); // 유저 정보 없을 경우 루트로 이동
    }
  }, [userData]);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

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
                name={`examples.${index}.content`}
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="입력 값을 입력해주세요." />
                    {errors.examples?.[index]?.content && (
                      <p style={{ color: "red" }}>
                        {errors.examples[index].content?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          ))}
          <Button onClick={() => append({ content: "" })}>추가하기</Button>
          <Button htmlType="submit">저장</Button>
        </MessageWrapper>
      </div>
    </form>
  );
};

export default Setting;

const MessageWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
`;
