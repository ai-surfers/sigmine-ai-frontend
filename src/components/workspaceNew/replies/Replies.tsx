import { Flex } from "antd";
import React, { useEffect, useContext } from "react";
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
  const { resetStep } = useWorkspaceStep();
  const { animationPhase, currentStep } = useContext(AnimationContext);

  const replies = [
    () => <Reply1 />,
    () => <Reply2 />,
    () => <Reply3 />,
    () => <Reply4 />,
  ];

  const CurrentReply = replies[currentStep - 1];

  useEffect(() => {
    resetStep();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: animationPhase === "backward" ? -50 : 50 }}
        animate={{
          y: animationPhase === "next-reply-show" ? 100 : 0,
          opacity: animationPhase === "next-reply-show" ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, y: animationPhase === "backward" ? 100 : 50 }}
        style={{
          display: "flex",
          alignItems: "end",
          width: "100%",
          height: "360px",
          boxSizing: "border-box",
        }}
      >
        <Flex style={{ width: "100%", paddingTop: "calc(360px - 100%)" }}>
          <CurrentReply />
        </Flex>
      </motion.div>
    </AnimatePresence>
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
