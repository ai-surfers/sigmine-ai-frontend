"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Flex, Spin } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Text, Button } from "ai-surfers-design-system";
import { useDeviceSize } from "@/providers/DeviceContext";
import { useGoogleLogin } from "@/hooks/useGoogleLogin";

const Login = () => {
  const { isUnderTablet, isMobile } = useDeviceSize();
  const route = useRouter();
  const { loginWithGoogle, isLoading } = useGoogleLogin();

  const handleClickLoginButton = async () => {
    const isLoginSuccess = await loginWithGoogle();
    console.log(isLoginSuccess);
    if (isLoginSuccess) {
      route.push("/");
    }
  };

  return (
    <Flex
      vertical={isUnderTablet ? true : false}
      align="center"
      justify="start"
      gap={isUnderTablet ? 24 : 65}
      style={{
        padding: "24px 25px",
        maxHeight: "100vh",
        height: "calc(100vh - 52px)",
      }}
    >
      <StyledImage
        src={
          isUnderTablet
            ? "/imgs/login-background-mobile.png"
            : "/imgs/login-background.png"
        }
        alt="login"
        width={isUnderTablet ? 371 : 838}
        height={isUnderTablet ? 220 : 732}
        quality={100}
        $isMobile={isMobile}
        priority
      />
      <LoginWrapper $isUnderTablet={isUnderTablet}>
        <Text font="h1_24_semi" color="G_900" style={{ marginBottom: "47px" }}>
          시그마인에 오신 것을
          <br />
          환영해요! 👋
        </Text>
        {/* <Text font="b2_16_semi" color="G_700">
          팀 코드
        </Text>
        <Flex
          vertical
          onClick={() => setIsError(false)}
          style={{ height: "44px", width: "100%" }}
        >
          <Input
            placeholder="팀 코드를 입력해주세요"
            onChange={setTeamCode}
            value={teamCode}
            error={isError}
            hierarchy="sigmine"
          ></Input>
        </Flex>
        {isError && (
          <ErrorWrapper>
            <Icon name="InfoCircle" color="red" variant="Linear" />
            <Text font="c1_12_reg" color="red">
              유효하지 않은 코드입니다. 다시 확인해주세요.
            </Text>
          </ErrorWrapper>
        )}
        <NotiWrapper>
          <Icon name="SimpleCheck" color="G_400" size={6} variant="Linear" />
          <Text font="c1_12_reg" color="G_400">
            팀코드가 없다면, 팀 관리자에게 코드를 요청하세요
          </Text>
        </NotiWrapper> */}
        <Button
          onClick={handleClickLoginButton}
          hierarchy="sigminePrimary"
          size={52}
          style={{ justifyContent: "center" }}
          width="100%"
        >
          {isLoading ? <CustomSpin /> : "GOOGLE로 로그인"}
        </Button>
      </LoginWrapper>
    </Flex>
  );
};

export default Login;

const LoginWrapper = styled.div<{ $isUnderTablet: boolean }>`
  display: flex;
  max-width: 368px;
  height: 313px;
  flex-direction: column;
  justify-content: ${({ $isUnderTablet }) =>
    $isUnderTablet ? "start" : "center"};
  align-items: start;
  flex: 1;
`;

const StyledImage = styled(Image)<{ $isMobile: boolean }>``;

const NotiWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
  padding: 8px 12px;
  gap: 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.G_50};
  margin-top: 12px;
  margin-bottom: 24px;
  width: 100%;
`;

const ErrorWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
  gap: 4px;
  margin-top: 10px;
`;

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: ${({ theme }) => theme.colors.white} !important;
  }
`;
