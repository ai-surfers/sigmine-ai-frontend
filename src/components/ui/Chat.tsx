import React, { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Flex } from "antd";
import { Text } from "ai-surfers-design-system";

interface ChatProps {
  picture: string;
  name: string;
  position?: "right" | "left";
}

const Chat = ({
  picture,
  name,
  children,
  position = "right",
}: PropsWithChildren<ChatProps>) => {
  return (
    <Flex vertical gap={12} align={position === "left" ? "start" : "end"}>
      <ProfileSection>
        <Image src={picture} width={24} height={24} alt="profile-picture" />
        <Text font="b3_14_med" color="G_400">
          {name}
        </Text>
      </ProfileSection>
      {children}
    </Flex>
  );
};

export default Chat;

const ProfileSection = styled.div`
  ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
  gap: 8px;
`;
