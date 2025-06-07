import { Button, Icon, Input, Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import React, { useState } from "react";
import { useWorkspaceStep } from "@/hooks/useWorkspaceStep";
import { PostWorkspaceParamType } from "@/types/workspaces";
import { usePostWorkspaces } from "@/hooks/mutations/usePostWorkplaces";
import { Wrapper } from "./Replies";
import { useRouter } from "next/navigation";

const Reply4 = () => {
  const { goBack, setStepResult, getValidatedState } = useWorkspaceStep();
  const [content, setContent] = useState("");

  const handleClickBackButton = () => {
    goBack();
  };

  const handleChangeContent = (e: string) => {
    setContent(e);
  };

  const route = useRouter();

  const { mutate: handleSubmit } = usePostWorkspaces({
    onSuccess: () => {
      console.log("create workspace successed");
      route.push("/");
    },
    onError: () => {
      console.log("create workspace failed");
    },
  });

  const handleClickCompleteButton = () => {
    if (!content) return;

    setStepResult(4, content);

    const validatedState = getValidatedState();
    if (!validatedState) return;

    const param: PostWorkspaceParamType = {
      workspace_name: content,
      industry: validatedState.step1Res,
      company_size: validatedState.step2Res,
      website: validatedState.step3Res || "",
    };

    handleSubmit(param);
  };

  return (
    <Flex vertical gap={12} style={{ width: "100%" }}>
      <Button
        hierarchy="default"
        size={36}
        width="168px"
        onClick={handleClickBackButton}
      >
        <Flex gap={8} align="center">
          <Text
            font="b3_14_semi"
            color="G_600"
            style={{ whiteSpace: "nowrap" }}
          >
            이전 대화로 돌아가기
          </Text>
          <Icon name="ArrowLeft" color="G_600" variant="Linear" size={16} />
        </Flex>
      </Button>
      <Wrapper>
        <Flex vertical style={{ width: "100%" }} gap={12}>
          <Flex justify="start" align="center" gap={12}>
            <Text font="b2_16_med" color="G_800">
              워크스페이스의 이름을 입력해주세요
            </Text>
            <Text font="c1_12_reg" color="sigmine_primary">
              필수
            </Text>
          </Flex>

          <Flex
            style={{
              flex: 1,
              height: "52px",
              maxWidth: "668px",
              width: "100%",
            }}
          >
            <Input
              onChange={(e) => handleChangeContent(e)}
              value={content}
              placeholder="워크스페이스 이름"
              count={100}
            />
          </Flex>
          <Button
            hierarchy={content === "" ? "disabled" : "sigminePrimary"}
            onClick={handleClickCompleteButton}
            size={52}
            style={{ justifyContent: "center" }}
          >
            <Text font="b2_16_semi" color={content === "" ? "G_300" : "white"}>
              워크스페이스 만들기
            </Text>
          </Button>
        </Flex>
      </Wrapper>
    </Flex>
  );
};

export default Reply4;
