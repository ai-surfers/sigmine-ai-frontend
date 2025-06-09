import React from "react";
import Chat from "../../ui/Chat";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";

import { motion } from "framer-motion";

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

export default LeftChat4;
