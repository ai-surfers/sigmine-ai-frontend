import { Button, Icon, Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import React, { useState } from "react";
import { SIZE } from "@/constants/workspace";
import { SizeKey } from "@/types/workspaces";
import { useWorkspaceStep } from "@/hooks/useWorkspaceStep";
import { Wrapper, StyledButton } from "./Replies";

const Reply2 = () => {
  const { goBack, goNext, setStepResult } = useWorkspaceStep();
  const [selectedKey, setSelectedKey] = useState<SizeKey | null>(null);

  const handleClickBackButton = () => {
    goBack();
  };

  const handleClickSizeButton = (key: SizeKey | null) => {
    if (key === selectedKey) {
      setSelectedKey(null);
    } else {
      setSelectedKey(key);
    }
  };

  const handleClickCompleteButton = () => {
    setStepResult(2, selectedKey);
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
        <Flex vertical gap={11}>
          <Flex justify="start" align="center" gap={12}>
            <Text font="b2_16_med" color="G_800">
              회사 규모를 선택해주세요
            </Text>
            <Text font="c1_12_reg" color="sigmine_primary">
              필수
            </Text>
          </Flex>
          <Flex gap={8}>
            {[...SIZE.entries()].map(([key, value]) => {
              const isSelected = selectedKey === key;
              return (
                <StyledButton
                  key={key}
                  hierarchy="sigmineDefault"
                  onClick={() => handleClickSizeButton(key)}
                  $isSelected={isSelected}
                >
                  <Text
                    font="b3_14_med"
                    color={isSelected ? "sigmine_primary" : "G_600"}
                  >
                    {value}
                  </Text>
                </StyledButton>
              );
            })}

            <Button
              hierarchy={selectedKey === null ? "disabled" : "sigminePrimary"}
              onClick={handleClickCompleteButton}
            >
              <Icon
                name="Send"
                color={selectedKey === null ? "G_300" : "white"}
                variant="Outline"
              />
            </Button>
          </Flex>
        </Flex>
      </Wrapper>
    </Flex>
  );
};

export default Reply2;
