"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, message, Spin } from "antd";
import React, { useEffect } from "react";
import { Control, FieldErrors, useForm } from "react-hook-form";
import { usePostSettings } from "@/hooks/mutations/usePostSettings";

import { SettingType } from "@/types/threads";
import { useSettingsQuery } from "@/hooks/queries/useSettings";
import StepIndicator, { SETTING_STEPS } from "../ui/Step";
import ProfileController from "./ProfileController";
import ExampleController from "./ExampleController";
import { z } from "zod";
import { Button, Icon, Text } from "ai-surfers-design-system";

export const SETTING_SCHEMA = z.object({
  persona: z.string().min(1, "필수"),
  examples: z.array(z.object({ content: z.string().min(1, "필수") })),
});

export interface ControllerProps {
  control: Control<SettingType>;
  errors: FieldErrors<SettingType>;
}

const Setting = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingType>({
    resolver: zodResolver(SETTING_SCHEMA),
    defaultValues: {
      persona: "",
      examples: [{ content: "" }],
    },
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", padding: "0 60px" }}
    >
      <Flex align="center" justify="space-between">
        <StepIndicator steps={SETTING_STEPS} />
        <Button hierarchy="sigminePrimary" size={44}>
          <Text color="white" font="b2_16_semi">
            스레드 톤&성격 저장
          </Text>
          <Icon name="UserOctagon" variant="Bold" size={20} color="white" />
        </Button>
      </Flex>
      <Flex
        gap={60}
        style={{
          width: "100%",
          marginTop: "24px",
          height: "calc(100vh - 52px - 93px - 24px)",
        }}
      >
        <ProfileController control={control} errors={errors} />
        <ExampleController control={control} errors={errors} />
      </Flex>
    </form>
  );
};

export default Setting;
