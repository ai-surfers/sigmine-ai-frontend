"use client";

import React, { useRef } from "react";
import GetFirstSentence from "./GetFirstSentence";
import GetBody from "./GetBody";
import { Flex } from "antd";
import StepIndicator, { SETTING_STEPS } from "../ui/Step";
import { useDeviceSize } from "@/providers/DeviceContext";

const Thread = () => {
  const bodyRef = useRef<HTMLDivElement>(null); // 단계 이동시 스크롤할 때 사용할 ref
  const { isMobile } = useDeviceSize();

  return (
    <Flex
      ref={bodyRef}
      vertical
      gap={30}
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
        padding: isMobile ? "0 20px" : "0 60px",
      }}
    >
      <StepIndicator steps={SETTING_STEPS} />
      <GetFirstSentence scrollRef={bodyRef} />
      <GetBody scrollRef={bodyRef} />
    </Flex>
  );
};

export default Thread;
