"use client";

import styled from "styled-components";
import WelcomeBanner from "./WelcomeBanner";
import WorkspaceList from "./WorkspaceList";

const Home = () => {
  return (
    <Wrapper>
      <WelcomeBanner />
      <WorkspaceList />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
  gap: 40px;
  padding: 24px;
`;
