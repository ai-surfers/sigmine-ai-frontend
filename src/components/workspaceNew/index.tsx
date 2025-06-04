"use client";

import React from "react";
import styled from "styled-components";
import StepLNB from "./StepLNB";
import Chats from "./Chats";
import { useRecoilValue } from "recoil";
import { createWorkspaceState } from "@/states/createWorkspaceState";
import Replies from "./replies/Replies";

const WorkSpaceNew = () => {
  const { step } = useRecoilValue(createWorkspaceState);
  return (
    <Background>
      <LNBSection>
        <StepLNB />
      </LNBSection>
      <ChattingSection>
        <Chats />
        <Replies />
      </ChattingSection>
    </Background>
  );
};

export default WorkSpaceNew;

const Background = styled.div`
  ${({ theme }) => theme.mixins.flexBox("row", "start", "start")};
  background: linear-gradient(180deg, #fff 0%, #f1f2f6 100%);
  width: 100vw;
  height: calc(100vh - 52px);
  padding-top: 40px;
  padding-bottom: 100px;
  position: relative; //전역 Wrapper의 max-width, margin 무효화
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const LNBSection = styled.div`
  flex: 0.225;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const ChattingSection = styled.div`
  flex: 0.775;
  ${({ theme }) => theme.mixins.flexBox("column", "space-between", "start")};
  max-width: 692px;
  width: 100%;
  height: 100%;
`;

const StepSection = styled.div``;
