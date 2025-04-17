"use client";

import styled from "styled-components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

const LayoutContainer = styled.div`
  position: relative;
  min-height: 100vh; // 전체 뷰포트 높이를 차지하도록 설정
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 30px;
`;
