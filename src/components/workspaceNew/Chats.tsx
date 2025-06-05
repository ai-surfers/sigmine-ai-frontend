import React from "react";
import Chat from "../ui/Chat";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import { useRecoilValue } from "recoil";
import { createWorkspaceState } from "@/states/createWorkspaceState";
import styled from "styled-components";
import { useUser } from "@/hooks/auth/useUser";
import { INDUSTRY, SIZE } from "@/constants/workspace";

const LeftChat1 = () => {
  const { userData } = useUser();
  return (
    <Chat name="시그마인 AI" picture="/imgs/workspaces/logo-profile.png">
      <Flex vertical gap={4}>
        <Text font="b2_16_reg" color="G_800">
          시그마인에 오신 것을 환영합니다, {userData.email} 님! 함께 일하게 되어
          기쁩니다.
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

const LeftChat2 = () => {
  return (
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
  );
};

const LeftChat3 = () => {
  return (
    <Chat name="시그마인 AI" picture="/imgs/workspaces/logo-profile.png">
      <Flex vertical gap={4}>
        <Text font="b2_16_reg" color="G_800">
          정말 훌륭한 팀이네요! 귀사 브랜드의 블로그 게시물이나 전환율이 높은
          웹페이지 URL을 공유해 주시겠어요? 이를 통해 귀사의 고유한 캐릭터와
          분위기를 파악하여 귀사 브랜드에 딱 맞는 콘텐츠를 제작할 수 있습니다.
        </Text>
      </Flex>
    </Chat>
  );
};

const LeftChat4 = () => {
  return (
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
  const { step, step1Res, step2Res, step3Res, step4Res } =
    useRecoilValue(createWorkspaceState);
  const { userData } = useUser();

  return (
    <ChatsWrapper>
      {/* 1단계 */}
      <LeftChat1 />
      {!!step1Res && (
        <RightChat
          name={userData.email}
          picture={userData.picture}
          response={INDUSTRY.get(step1Res)?.ko ?? ""}
        />
      )}
      {/* 2단계 */}
      {step >= 2 && <LeftChat2 />}
      {step >= 2 && !!step2Res && (
        <RightChat
          name={userData.email}
          picture={userData.picture}
          response={SIZE.get(step2Res) ?? ""}
        />
      )}
      {/* 3단계 */}
      {step >= 3 && <LeftChat3 />}
      {step >= 3 && step3Res !== null && (
        <RightChat
          name={userData.email}
          picture={userData.picture}
          response={step3Res === "" ? "나중에 입력할게요." : step3Res}
        />
      )}

      {/* 4단계 */}
      {step >= 4 && <LeftChat4 />}
      {step >= 4 && step4Res !== null && (
        <RightChat
          name={userData.email}
          picture={userData.picture}
          response={step4Res}
        />
      )}
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
