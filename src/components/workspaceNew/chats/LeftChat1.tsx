import React, { useContext, useEffect, useRef, useState } from "react";
import Chat from "../../ui/Chat";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import { useUser } from "@/hooks/auth/useUser";
import { motion } from "framer-motion";
import { AnimationContext } from "../index";

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

export default LeftChat1;
