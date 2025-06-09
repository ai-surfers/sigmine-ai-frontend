"use client";

import { WorkspaceType } from "@/types/workspaces";
import React from "react";
import { Text } from "ai-surfers-design-system";
import { Flex } from "antd";
import styled from "styled-components";
import Image from "next/image";
const WorkspaceBox = ({
  id,
  name,
  industry,
  company_size,
  website,
}: WorkspaceType) => {
  const industryBg: Record<string, string> = {
    Consulting: "/imgs/workspaces/bg-consulting.png",
    Tech: "/imgs/workspaces/bg-tech.png",
    Retail: "/imgs/workspaces/bg-retail.png",
    Media: "/imgs/workspaces/bg-media.png",
    Creative: "/imgs/workspaces/bg-creative.png",
    Finance: "/imgs/workspaces/bg-finance.png",
    Education: "/imgs/workspaces/bg-education.png",
    Healthcare: "/imgs/workspaces/bg-healthcare.png",
    Other: "/imgs/workspaces/bg-etc.png",
  };

  const industryBadge: Record<string, string> = {
    Consulting: "/imgs/workspaces/badge-consulting.png",
    Tech: "/imgs/workspaces/badge-tech.png",
    Retail: "/imgs/workspaces/badge-retail.png",
    Media: "/imgs/workspaces/badge-media.png",
    Creative: "/imgs/workspaces/badge-creative.png",
    Finance: "/imgs/workspaces/badge-finance.png",
    Education: "/imgs/workspaces/badge-education.png",
    Healthcare: "/imgs/workspaces/badge-healthcare.png",
    Other: "/imgs/workspaces/badge-etc.png",
  };

  return (
    <Wrapper>
      <Image
        src={industryBg[industry]}
        alt={industry}
        width={248}
        height={92}
        style={{ borderRadius: "8px 8px 0 0" }}
      />
      <Image
        src={industryBadge[industry]}
        alt={industry}
        width={36}
        height={36}
        style={{
          zIndex: 1000,
          position: "absolute",
          top: "16px",
          left: "16px",
        }}
      />
      <Flex vertical style={{ width: "100%", padding: "16px" }}>
        <Text font="b2_16_med" color="G_800">
          {name}
        </Text>
      </Flex>
    </Wrapper>
  );
};

export default WorkspaceBox;

const Wrapper = styled.div`
  width: 248px;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  border: 1.5px solid ${({ theme }) => theme.colors.sigmine_primary_10};
`;
