"use client";

import { useGetWorkspacesQuery } from "@/hooks/queries/useGetWorkspaces";
import { Flex, Spin } from "antd";
import React from "react";
import EmptyWorkspace from "./EmptyWorkspace";
import styled from "styled-components";
import { Text } from "ai-surfers-design-system";
import WorkspaceBox from "./WorkspaceBox";
import { WorkspaceType } from "@/types/workspaces";

interface WorkspaceListProps {
  data: WorkspaceType[];
  isLoading: boolean;
}

const WorkspaceList = ({ data, isLoading }: WorkspaceListProps) => {
  if (isLoading) return <Spin />;

  if (data.length === 0) return <EmptyWorkspace />;

  return (
    <Flex vertical gap={12.5} style={{ width: "100%", maxWidth: "1028px" }}>
      <Flex gap={8} align="center">
        <Text font="b1_18_semi" color="G_700">
          생성된 워크스페이스
        </Text>
        <Text font="b3_14_reg" color="G_500">
          {data.length}개
        </Text>
      </Flex>
      <Flex gap={12} wrap="wrap">
        {data.map((item: WorkspaceType) => (
          <WorkspaceBox
            id={item.id}
            name={item.name}
            industry={item.industry}
            company_size={item.company_size}
            website={item.website}
            created_at={item.created_at}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default WorkspaceList;
