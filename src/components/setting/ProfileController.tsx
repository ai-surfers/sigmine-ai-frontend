import React from "react";
import { Text, Textarea } from "ai-surfers-design-system";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { ControllerProps } from "./Setting";
import Image from "next/image";
import { Flex } from "antd";

const ProfileController = ({ control, errors }: ControllerProps) => {
  return (
    <Wrapper>
      <Flex gap={5}>
        <Image
          src="/imgs/logo-symbol-blue-circle.png"
          width={24}
          height={24}
          alt="logo-blue"
        />
        <Text font="b3_14_med" color="G_500">
          시그마인 AI
        </Text>
      </Flex>
      <ProfileNotice font="b3_14_reg" color="G_600">
        사람들을 집중시킬 스레드 첫문장을 만들기 전, 계정에 맞는 톤과 성격을
        학습할게요.
        <br />
        스레드의 말투나 글의 형식은 어땠으면 좋겠나요?
        <br />이 설정은 언제든지 바꿀 수 있어요.
      </ProfileNotice>
      <Flex gap={12} align="center">
        <Text font="b1_18_semi" color="G_700">
          스레드 프로필 설정하기
        </Text>
        <Text font="c1_12_reg" color="primary">
          필수
        </Text>
      </Flex>
      <Controller
        name="persona"
        control={control}
        render={({ field }) => (
          <>
            <Textarea
              {...field}
              placeholder="입력 값을 입력해주세요."
              hierarchy="sigmine"
            />
            {errors.persona && (
              <Text color="red" font="b3_14_reg">
                {errors.persona.message}
              </Text>
            )}
          </>
        )}
      />
    </Wrapper>
  );
};

export default ProfileController;

const Wrapper = styled.div`
  margin-top: 17.5px;
  width: 100%;
  max-width: 466px;
`;

const ProfileNotice = styled(Text)`
  padding: 12px;
  border-radius: 0px 12px 12px 12px;
  background: ${({ theme }) => theme.colors.G_50};
  margin-top: 9.5px;
  margin-bottom: 32px;
`;
