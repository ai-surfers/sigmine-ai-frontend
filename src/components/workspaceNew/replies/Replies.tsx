import { createWorkspaceState } from "@/states/createWorkspaceState";
import { Button, Icon, Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { INDUSTRY, IndustryKey, IndustryValue } from "@/constants/industry";

const Reply1 = () => {
  const [selectedKey, setSelectedKey] = useState<IndustryKey | "">("");
  const setStep1Res = useSetRecoilState(createWorkspaceState);

  const handleClickIndustryButton = (key: IndustryKey | "") => {
    if (key === selectedKey) {
      setSelectedKey("");
    } else {
      setSelectedKey(key);
    }
  };

  const handleClickCompleteButton = () => {
    setStep1Res({ step: 2, step1Res: selectedKey });
  };

  return (
    <Wrapper>
      <Flex vertical gap={12}>
        <Flex justify="start" align="center" gap={12}>
          <Text font="b2_16_med" color="G_800">
            산업 분야를 선택해주세요
          </Text>
          <Text font="c1_12_reg" color="sigmine_primary">
            필수
          </Text>
        </Flex>
        <Flex gap={8} justify="start" wrap="wrap">
          {(Object.entries(INDUSTRY) as [IndustryKey, IndustryValue][]).map(
            ([key, value]) => {
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
            }
          )}
        </Flex>
        <Button
          hierarchy={selectedKey === "" ? "disabled" : "sigminePrimary"}
          size={52}
          style={{ justifyContent: "center" }}
          onClick={handleClickCompleteButton}
        >
          <Flex
            justify={selectedKey === "" ? "stretch" : "center"}
            gap={selectedKey === "" ? 0 : 8}
          >
            <Text
              font="b2_16_med"
              color={selectedKey === "" ? "G_300" : "white"}
              style={{ width: selectedKey === "" ? "100%" : "auto" }}
            >
              선택 완료
            </Text>
            <Icon
              name="Send2"
              color={selectedKey === "" ? "G_300" : "white"}
              variant="Linear"
              size={20}
            />
          </Flex>
        </Button>
      </Flex>
    </Wrapper>
  );
};

const Reply2 = () => {
  const setStepState = useSetRecoilState(createWorkspaceState);
  const handleClickBackButton = () => {
    setStepState({ step: 1, step1Res: "" }); //Todo: useUser 같은 Hook 만들어서 상태 관리
  };
  return (
    <Flex vertical gap={12}>
      <Button
        hierarchy="default"
        size={36}
        width="168px"
        onClick={handleClickBackButton}
      >
        <Flex gap={8}>
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
        <Flex justify="start" align="center" gap={12}>
          <Text font="b2_16_med" color="G_800">
            회사 규모를 선택해주세요
          </Text>
          <Text font="c1_12_reg" color="sigmine_primary">
            필수
          </Text>
        </Flex>
      </Wrapper>
    </Flex>
  );
};

const Reply3 = () => {
  return (
    <Wrapper>
      <Flex justify="start" align="center" gap={12}>
        <Text font="b2_16_med" color="G_800">
          웹페이지 또는 블로그 URL을 입력해주세요
        </Text>
        <Text font="c1_12_reg" color="G_400">
          선택
        </Text>
      </Flex>
    </Wrapper>
  );
};

const Replies = () => {
  const { step } = useRecoilValue(createWorkspaceState);
  const replies = [<Reply1 />, <Reply2 />, <Reply3 />];
  return replies[step - 1];
};

export default Replies;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 692px;
  min-height: 212px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 8px 48px 0px rgba(52, 61, 109, 0.08);
  padding: 16px;
`;

const StyledButton = styled(Button)<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.sigmine_primary_10 : theme.colors.G_50};
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.sigmine_primary_20 : theme.colors.G_100};
`;
