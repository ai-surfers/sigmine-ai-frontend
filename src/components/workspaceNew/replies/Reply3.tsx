import { Button, Icon, Input, Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import React, { useState } from "react";
import { useWorkspaceStep } from "@/hooks/useWorkspaceStep";
import { Wrapper } from "./Replies";

const Reply3 = () => {
  const { goBack, goNext, setStepResult } = useWorkspaceStep();
  const [content, setContent] = useState("");

  const handleClickBackButton = () => {
    goBack();
  };

  const handleChangeContent = (e: string) => {
    setContent(e);
  };

  const handleClickCompleteButton = () => {
    setStepResult(3, content);
    goNext();
  };

  const handleClickSkipButton = () => {
    setStepResult(3, "");
    goNext();
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
        <Flex vertical style={{ width: "100%" }}>
          <Flex justify="start" align="center" gap={12}>
            <Text font="b2_16_med" color="G_800">
              웹페이지 또는 블로그 URL을 입력해주세요
            </Text>
            <Text font="c1_12_reg" color="G_400">
              선택
            </Text>
          </Flex>
          <Flex gap={8} style={{ height: "52px", width: "100%" }}>
            <Flex
              style={{
                flex: 1,
                maxWidth: "502px",
                width: "100%",
              }}
            >
              <Input
                onChange={(e) => handleChangeContent(e)}
                value={content}
                placeholder="yourcompanyname.com"
              />
            </Flex>
            <Button
              hierarchy={content === "" ? "disabled" : "sigminePrimary"}
              onClick={handleClickCompleteButton}
              size={52}
            >
              <Icon
                name="Send"
                color={content === "" ? "G_300" : "white"}
                variant="Outline"
              />
            </Button>
            <Button
              onClick={handleClickSkipButton}
              hierarchy="default"
              size={52}
            >
              <Text font="b2_16_semi" color="G_600">
                건너뛰기
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Wrapper>
    </Flex>
  );
};

export default Reply3;
