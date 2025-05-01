"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex } from "antd";
import { login } from "@/hooks/queries/useLogin";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { LOCALSTORAGE_KEYS, setLocalStorage } from "@/utils/storageUtils";
import { useAutoLogin } from "@/hooks/useAutoLogin";
import Image from "next/image";
import { Input, Text, Button, Icon } from "ai-surfers-design-system";

const Login = () => {
  const [teamCode, setTeamCode] = useState("");
  const [isError, setIsError] = useState(false);
  const { setUserTeamName, userData } = useUser();
  const route = useRouter();

  const handleClickLoginButton = async () => {
    if (!teamCode) {
      alert("팀 코드를 입력해주세요.");
      return;
    }

    try {
      const { data } = await login(teamCode);
      if (data) {
        setUserTeamName(data.team_name);
        setLocalStorage(LOCALSTORAGE_KEYS.TEAM_CODE, teamCode);
        console.log(userData);
        route.push(`/home`);
      } else {
        setIsError(true);
      }
    } catch (err) {
      console.error(err, "로그인 실패");
      setIsError(true);
    }
  };

  useAutoLogin();

  useEffect(() => {
    if (userData.isLogin) {
      route.push(`/home`);
    }
  }, [userData]);

  return (
    <Flex
      align="center"
      justify="start"
      gap={65}
      style={{
        padding: "24px 25px",
        maxHeight: "100vh",
        height: "calc(100vh - 52px)",
      }}
    >
      <StyledImage
        src="/imgs/login-background.png"
        alt="login"
        width={838}
        height={800}
        quality={100}
      />
      <LoginWrapper>
        <Text font="h1_24_semi" color="G_900" style={{ marginBottom: "47px" }}>
          시그마인에 오신 것을
          <br />
          환영해요! 👋
        </Text>
        <Text font="b2_16_semi" color="G_700">
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
            <Icon name="InfoCircle" color="red" />
            <Text font="c1_12_reg" color="red">
              유효하지 않은 코드입니다. 다시 확인해주세요.
            </Text>
          </ErrorWrapper>
        )}
        <NotiWrapper>
          <Icon name="SimpleCheck" color="G_400" size={6} />
          <Text font="c1_12_reg" color="G_400">
            팀코드가 없다면, 팀 관리자에게 코드를 요청하세요
          </Text>
        </NotiWrapper>
        <Button
          onClick={handleClickLoginButton}
          hierarchy={teamCode.length > 0 ? "sigminePrimary" : "disabled"}
          size={52}
          style={{ justifyContent: "center" }}
          width="100%"
        >
          로그인
        </Button>
      </LoginWrapper>
    </Flex>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  max-width: 368px;
  height: 313px;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex: 1;
`;

const StyledImage = styled(Image)`
  // max-height: calc(100vh - 48px);
`;

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
