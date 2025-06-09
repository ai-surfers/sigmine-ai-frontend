import React from "react";
import Chat from "../../ui/Chat";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import { motion } from "framer-motion";

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

export default LeftChat3;
