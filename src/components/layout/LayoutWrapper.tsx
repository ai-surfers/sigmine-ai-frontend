"use client";
import styled from "styled-components";
import Header from "../header";

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}
