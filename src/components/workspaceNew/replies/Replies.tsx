import { Flex } from "antd";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { createWorkspaceState } from "@/states/createWorkspaceState";
import Reply1 from "./Reply1";
import Reply2 from "./Reply2";
import Reply3 from "./Reply3";
import Reply4 from "./Reply4";

const Replies = () => {
  const { resetStep, getCurrentStep } = useWorkspaceStep();

  const replies = [<Reply1 />, <Reply2 />, <Reply3 />, <Reply4 />];

  useEffect(() => {
    resetStep();
  }, []);

  return (
    <Flex style={{ width: "100%", paddingTop: "96px" }}>
      {replies[getCurrentStep - 1]}
    </Flex>
  );
};

export default Replies;

import { Button } from "ai-surfers-design-system";
import styled from "styled-components";
import { useWorkspaceStep } from "@/hooks/useWorkspaceStep";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 692px;
  width: 100%;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 8px 48px 0px rgba(52, 61, 109, 0.08);
  padding: 16px;
`;

export const StyledButton = styled(Button)<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.sigmine_primary_10 : theme.colors.G_50};
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.sigmine_primary_20 : theme.colors.G_100};
`;
