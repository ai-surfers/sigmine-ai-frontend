"use client";

import styled from "styled-components";
import WelcomeBanner from "./WelcomeBanner";
import WorkspaceList from "./WorkspaceList";
import { useGetWorkspacesQuery } from "@/hooks/queries/useGetWorkspaces";

const Home = () => {
  const { data, isLoading } = useGetWorkspacesQuery();

  return (
    <Wrapper>
      <WelcomeBanner isEmpty={data?.items.length === 0} />
      <WorkspaceList data={data?.items || []} isLoading={isLoading} />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
  gap: 40px;
  padding: 24px;
`;
