"use client";

import React from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import Title from "antd/es/typography/Title";

const Login = () => {
  return (
    <LoginWrapper>
      <Title>Sigmine</Title>
      <Title level={4}>Work Smarter, with your AI Employees</Title>
      <Title level={4}>팀 코드</Title>
      <Input
        placeholder="팀 코드를 입력하세요"
        style={{ marginBottom: "10px" }}
      ></Input>
      <Button>로그인</Button>
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
