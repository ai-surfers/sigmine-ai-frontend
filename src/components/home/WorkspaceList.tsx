import { useGetWorkspacesQuery } from "@/hooks/queries/useGetWorkspaces";
import { Spin } from "antd";
import React from "react";
import EmptyWorkspace from "./EmptyWorkspace";
import styled from "styled-components";

const WorkspaceList = () => {
  const { data, isLoading } = useGetWorkspacesQuery();

  if (isLoading) return <Spin />;

  if (data?.items.length === 0) return <EmptyWorkspace />;

  return <div>{data?.items[0]?.id}</div>;
};

export default WorkspaceList;
