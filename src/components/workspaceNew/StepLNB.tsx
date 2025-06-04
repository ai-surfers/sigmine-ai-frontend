import { createWorkspaceState } from "@/states/createWorkspaceState";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

const STEP_CONTENTS = [
  "산업 분야 설정",
  "회사 규모 설정",
  "채널 URL 설정",
  "워크스페이스 만들기",
];

const StepLNB = () => {
  const { step } = useRecoilValue(createWorkspaceState);

  return (
    <Flex vertical style={{ marginLeft: "24px" }}>
      {STEP_CONTENTS.map((item, index) => (
        <StepButton>
          <Flex gap={8}>
            <RoundNumber $isFocused={index + 1 === step}>
              <Text font="c2_11_med" color="white">
                {index + 1}
              </Text>
            </RoundNumber>
            <Text
              font={index + 1 === step ? "c1_12_semi" : "c1_12_reg"}
              color={index + 1 === step ? "G_600" : "G_300"}
            >
              {item}
            </Text>
          </Flex>
        </StepButton>
      ))}
    </Flex>
  );
};

export default StepLNB;

const StepButton = styled.button`
  width: 148px;
  height: 34px;
  cursor: default;
`;

const RoundNumber = styled.div<{ $isFocused: boolean }>`
  border-radius: 100%;
  background: ${({ theme, $isFocused }) =>
    $isFocused ? theme.colors.G_900 : theme.colors.G_200};
  width: 16px;
  height: 16px;
`;
