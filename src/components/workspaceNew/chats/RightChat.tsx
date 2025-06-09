import React from "react";
import Chat from "../../ui/Chat";
import { Text } from "ai-surfers-design-system";
import { useUser } from "@/hooks/auth/useUser";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

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

export default RightChat;

const ChatBubble = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.G_100};
  padding: 12px;
`;
