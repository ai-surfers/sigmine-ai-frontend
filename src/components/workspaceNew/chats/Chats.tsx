import React, { useContext, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { createWorkspaceState } from "@/states/createWorkspaceState";
import styled from "styled-components";
import { useUser } from "@/hooks/auth/useUser";
import { INDUSTRY, SIZE } from "@/constants/workspace";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationContext } from "../index";
import LeftChat1 from "./LeftChat1";
import LeftChat2 from "./LeftChat2";
import LeftChat3 from "./LeftChat3";
import LeftChat4 from "./LeftChat4";
import RightChat from "./RightChat";

const Chats = () => {
  const { step, step1Res, step2Res, step3Res, step4Res } =
    useRecoilValue(createWorkspaceState);
  const { userData } = useUser();
  const { animationPhase, setAnimationPhase, currentStep, setCurrentStep } =
    useContext(AnimationContext);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollToBottom = () => {
        const container = chatContainerRef.current;
        if (container) {
          const targetScroll = container.scrollHeight - container.clientHeight;
          const startScroll = container.scrollTop;
          const distance = targetScroll - startScroll;
          const duration = 1000; // 1초
          const startTime = performance.now();

          const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeInOutQuad easing function
            const easeProgress =
              progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            container.scrollTop = startScroll + distance * easeProgress;

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
        }
      };

      scrollToBottom();
    }
  }, [animationPhase, currentStep]);

  useEffect(() => {
    if (step > currentStep) {
      setAnimationPhase("right-chat-show");
      setTimeout(() => {
        setAnimationPhase("left-chat-show");
        setCurrentStep(step);
        setTimeout(() => {
          setAnimationPhase("next-reply-show");
          setTimeout(() => {
            setAnimationPhase("idle");
          }, 500);
        }, 500);
      }, 500);
    } else if (step < currentStep) {
      setAnimationPhase("backward");
      setTimeout(() => {
        setCurrentStep(step);
        setTimeout(() => {
          setAnimationPhase("next-reply-show");
          setTimeout(() => {
            setAnimationPhase("idle");
          }, 500);
        }, 500);
      }, 500);
    }
  }, [step, currentStep, setAnimationPhase, setCurrentStep]);

  return (
    <ChatsWrapper ref={chatContainerRef}>
      {/* 1단계 */}
      <LeftChat1 />
      <AnimatePresence mode="wait">
        {!!step1Res && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <RightChat response={INDUSTRY.get(step1Res)?.ko ?? ""} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 2단계 */}
      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LeftChat2 />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {step >= 2 && !!step2Res && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <RightChat response={SIZE.get(step2Res) ?? ""} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 3단계 */}
      <AnimatePresence mode="wait">
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LeftChat3 />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {step >= 3 && step3Res !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <RightChat
              response={step3Res === "" ? "나중에 입력할게요." : step3Res}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 4단계 */}
      <AnimatePresence mode="wait">
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LeftChat4 />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {step >= 4 && step4Res !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <RightChat response={step4Res} />
          </motion.div>
        )}
      </AnimatePresence>
    </ChatsWrapper>
  );
};

export default Chats;
const ChatsWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "start", "space-between")};
  height: 100%;
  width: 100%;
  gap: 20px;
  overflow-y: scroll;
  padding-right: 20px;
`;
