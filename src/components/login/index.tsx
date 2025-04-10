"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import Title from "antd/es/typography/Title";
import { login, useLogin } from "@/hooks/queries/useLogin";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

const Login = () => {
  const [teamCode, setTeamCode] = useState("");
  const { setUserTeamName, setUserTeamCode, userData } = useUser();
  const route = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamCode(e.target.value);
  };

  const handleClickLoginButton = async () => {
    if (!teamCode) {
      alert("팀 코드를 입력해주세요.");
      return;
    }

    try {
      const data = await login(teamCode);
      if (data) {
        setUserTeamName(data.team_name);
        setUserTeamCode(teamCode);
        console.log(userData);
        route.push(`/home`);
      }
    } catch (err) {
      console.error(err, "로그인 실패");
    }
  };

  return (
    <LoginWrapper>
      <Title>Sigmine</Title>
      <Title level={4}>Work Smarter, with your AI Employees</Title>
      <Title level={4}>팀 코드</Title>
      <Input
        placeholder="팀 코드를 입력하세요"
        style={{ marginBottom: "10px" }}
        onChange={(e) => handleChangeInput(e)}
      ></Input>
      <Button onClick={handleClickLoginButton}>로그인</Button>
      <Title level={5}>팀 관리자에게 코드를 요청하세요</Title>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  width: 400px;
  height: 100vh;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
