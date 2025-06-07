import { Button, Icon, Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import React, { useState } from "react";
import { INDUSTRY } from "@/constants/workspace";
import { IndustryKey } from "@/types/workspaces";
import { useWorkspaceStep } from "@/hooks/useWorkspaceStep";
import { Wrapper, StyledButton } from "./Replies";

const Reply1 = () => {
  const [selectedKey, setSelectedKey] = useState<IndustryKey | null>(null);
  const { goNext, setStepResult } = useWorkspaceStep();

  const handleClickIndustryButton = (key: IndustryKey | null) => {
    if (key === selectedKey) {
      setSelectedKey(null);
    } else {
      setSelectedKey(key);
    }
  };

  const handleClickCompleteButton = () => {
    setStepResult(1, selectedKey);
    goNext();
  };

  return (
    <Wrapper>
      <Flex vertical gap={12} style={{ width: "100%" }}>
        <Flex justify="start" align="center" gap={12}>
          <Text font="b2_16_med" color="G_800">
            산업 분야를 선택해주세요
          </Text>
          <Text font="c1_12_reg" color="sigmine_primary">
            필수
          </Text>
        </Flex>
        <Flex gap={8} justify="start" wrap="wrap">
          {[...INDUSTRY.entries()].map(([key, value]) => {
            const isSelected = selectedKey === key;

            return (
              <StyledButton
                key={key}
                hierarchy="sigmineDefault"
                size={80}
                width="75px"
                onClick={() => handleClickIndustryButton(key)}
                $isSelected={isSelected}
              >
                <Flex vertical justify="center" align="center" gap={4}>
                  <Icon
                    name={value.emoji}
                    color={isSelected ? "primary" : "G_600"}
                    size={28}
                    variant="Bold"
                  />
                  <Text
                    font="b3_14_med"
                    color={isSelected ? "primary" : "G_600"}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {value.ko}
                  </Text>
                </Flex>
              </StyledButton>
            );
          })}
        </Flex>
        <Button
          hierarchy={selectedKey === null ? "disabled" : "sigminePrimary"}
          size={52}
          style={{ justifyContent: "center" }}
          onClick={handleClickCompleteButton}
        >
          <Flex
            justify={selectedKey === null ? "stretch" : "center"}
            gap={selectedKey === null ? 0 : 8}
          >
            <Text
              font="b2_16_med"
              color={selectedKey === null ? "G_300" : "white"}
              style={{ width: selectedKey === null ? "100%" : "auto" }}
            >
              선택 완료
            </Text>
            <Icon
              name="Send2"
              color={selectedKey === null ? "G_300" : "white"}
              variant="Linear"
              size={20}
            />
          </Flex>
        </Button>
      </Flex>
    </Wrapper>
  );
};

export default Reply1;
