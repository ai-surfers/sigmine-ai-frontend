"use client";

import React, { useRef, useState } from "react";
import Setting from "./Setting";
import GetFirstSentence from "./GetFirstSentence";
import GetBody from "./GetBody";
import { StepType } from "@/types/threads";
import { Flex } from "antd";

const Thread = () => {
  const [step, setStep] = useState<StepType>(1);

  const bodyRef = useRef<HTMLDivElement>(null); // 단계 이동시 스크롤할 때 사용할 ref

  return (
    <Flex
      ref={bodyRef}
      vertical
      gap={30}
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <Setting setStep={setStep} scrollRef={bodyRef} />
      <GetFirstSentence step={step} setStep={setStep} scrollRef={bodyRef} />
      <GetBody step={step} setStep={setStep} scrollRef={bodyRef} />
    </Flex>
  );
};

export default Thread;
