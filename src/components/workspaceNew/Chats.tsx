import React from "react";
import Chat from "../ui/Chat";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import { useRecoilValue } from "recoil";
import { createWorkspaceState } from "@/states/createWorkspaceState";
import styled from "styled-components";
import { useUser } from "@/hooks/auth/useUser";

const LeftChat1 = () => {
  return (
    <Chat name="시그마인 AI" picture="/imgs/workspaces/logo-profile.png">
      <Flex vertical gap={4}>
        <Text font="b2_16_reg" color="G_800">
          시그마인에 오신 것을 환영합니다, 김윤권 님! 함께 일하게 되어 기쁩니다.
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
  );
};

const RightChat = ({
  name,
  picture,
  response,
}: {
  name: string;
  picture: string;
  response: string;
}) => {
  return (
    <Chat name={name} picture={picture} position="right">
      <ChatBubble>
        <Text font="b2_16_med" color="G_600">
          {response}
        </Text>
      </ChatBubble>
    </Chat>
  );
};

const Chats = () => {
  const { step, step1Res } = useRecoilValue(createWorkspaceState);
  const { userData } = useUser();
  return (
    <ChatsWrapper>
      {/* 1단계 */}
      <LeftChat1 />
      {step1Res !== "" && (
        <RightChat
          name={userData.nickname}
          picture={userData.picture}
          response={step1Res}
        />
      )}
    </ChatsWrapper>
  );
};

export default Chats;

const ChatsWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "start", "space-between")};
  height: 100%;
`;

const ChatBubble = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.G_100};
  padding: 12px;
`;
