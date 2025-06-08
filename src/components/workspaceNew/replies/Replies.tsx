import { Flex } from "antd";
import React, { useEffect, useContext } from "react";
import { useRecoilValue } from "recoil";
import { createWorkspaceState } from "@/states/createWorkspaceState";
import Reply1 from "./Reply1";
import Reply2 from "./Reply2";
import Reply3 from "./Reply3";
import Reply4 from "./Reply4";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationContext } from "../index";
import { Button } from "ai-surfers-design-system";
import styled from "styled-components";
import { useWorkspaceStep } from "@/hooks/useWorkspaceStep";

const Replies = () => {
  const { resetStep, getCurrentStep } = useWorkspaceStep();
  const { animationPhase, currentStep } = useContext(AnimationContext);

  const replies = [<Reply1 />, <Reply2 />, <Reply3 />, <Reply4 />];

  useEffect(() => {
    resetStep();
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: animationPhase === "right-chat-show" ? 100 : 0,
        opacity: animationPhase === "right-chat-show" ? 0 : 1,
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ width: "100%", paddingTop: "96px" }}
    >
      <AnimatePresence>
        <Flex style={{ width: "100%" }}>{replies[currentStep - 1]}</Flex>
      </AnimatePresence>
    </motion.div>
  );
};

export default Replies;

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
