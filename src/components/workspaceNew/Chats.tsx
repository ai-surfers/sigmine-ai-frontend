import React, { useContext, useEffect, useRef, useState } from "react";
import Chat from "../ui/Chat";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import { useRecoilValue } from "recoil";
import { createWorkspaceState } from "@/states/createWorkspaceState";
import styled from "styled-components";
import { useUser } from "@/hooks/auth/useUser";
import { INDUSTRY, SIZE } from "@/constants/workspace";
import { motion, AnimatePresence } from "framer-motion";
import { AnimationContext } from "./index";

const LeftChat1 = () => {
  const { userData } = useUser();
  const { animationPhase } = useContext(AnimationContext);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (animationPhase === "left-chat-show") {
      setIsVisible(true);
    }
  }, [animationPhase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Chat name="시그마인 AI" picture="/imgs/workspaces/logo-profile.png">
        <Flex vertical gap={4}>
          <Text font="b2_16_reg" color="G_800">
            시그마인에 오신 것을 환영합니다, {userData.email.split("@")[0]} 님!
            함께 일하게 되어 기쁩니다.
            <br />
            먼저 귀하와 귀사에 대해 자세히 알아보기 위해 몇 가지 간단한 질문으로
            시작하겠습니다.
            <br />
            이를 통해 귀하께 맞춤 경험을 제공하고 최고의 추천을 제공해
            드리겠습니다!
          </Text>
          <Text font="b2_16_med" color="sigmine_primary">
            귀하의 회사는 어떤 산업 분야에 속해있나요?
          </Text>
        </Flex>
      </Chat>
    </motion.div>
  );
};

const LeftChat2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Chat name="시그마인 AI" picture="/imgs/workspaces/logo-profile.png">
        <Flex vertical gap={4}>
          <Text font="b2_16_reg" color="G_800">
            좋습니다!
          </Text>
          <Text font="b2_16_med" color="sigmine_primary">
            회사의 규모는 어떻게 되시나요?
          </Text>
        </Flex>
      </Chat>
    </motion.div>
  );
};

const LeftChat3 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Chat name="시그마인 AI" picture="/imgs/workspaces/logo-profile.png">
        <Flex vertical gap={4}>
          <Text font="b2_16_reg" color="G_800">
            정말 훌륭한 팀이네요! 귀사 브랜드의 블로그 게시물이나 전환율이 높은
            웹페이지 URL을 공유해 주시겠어요? 이를 통해 귀사의 고유한 캐릭터와
            분위기를 파악하여 귀사 브랜드에 딱 맞는 콘텐츠를 제작할 수 있습니다.
          </Text>
        </Flex>
      </Chat>
    </motion.div>
  );
};

const LeftChat4 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Chat name="시그마인 AI" picture="/imgs/workspaces/logo-profile.png">
        <Flex vertical gap={4}>
          <Text font="b2_16_reg" color="G_800">
            우리는 함께 멋진 일을 만들어낼 거예요!
          </Text>
          <Text font="b2_16_med" color="sigmine_primary">
            워크스페이스의 이름을 무엇으로 하실건가요?
          </Text>
        </Flex>
      </Chat>
    </motion.div>
  );
};

const RightChat = ({ response }: { response: string }) => {
  const { userData } = useUser();
  const name = userData.email.split("@")[0];
  const picture = userData.picture;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Chat name={name} picture={picture} position="right">
        <ChatBubble>
          <Text font="b2_16_med" color="G_600">
            {response}
          </Text>
        </ChatBubble>
      </Chat>
    </motion.div>
  );
};

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

const ChatBubble = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.G_100};
  padding: 12px;
`;
