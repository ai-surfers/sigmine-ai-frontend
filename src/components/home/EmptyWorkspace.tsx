import { Flex } from "antd";
import React from "react";
import { Text } from "ai-surfers-design-system";
import styled from "styled-components";

const EmptyWorkspace = () => {
  return (
    <Wrapper>
      <Text font="b1_18_med" color="G_800">
        아직 생성된 워크스페이스가 없어요
      </Text>
      <Text font="b3_14_reg" color="G_400">
        당신의 첫 마케팅 아이디어를 기다리고 있어요
        <br />새 프로젝트를 시작해보세요
      </Text>
    </Wrapper>
  );
};

export default EmptyWorkspace;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
  gap: 3px;
  width: 100%;
  max-width: 1028px;
  height: 216px;
  padding: 72px 0;
  text-align: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.G_50};
`;
