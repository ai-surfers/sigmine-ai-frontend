"use client";

import React, { useState } from "react";
import Setting from "./Setting";
import GetFirstSentence from "./GetFirstSentence";
import SetContents from "./SetContents";
import GetBody from "./GetBody";
import { StepType } from "@/types/threads";
import { Flex } from "antd";

const Thread = () => {
  const [step, setStep] = useState<StepType>(1);
  return (
    <Flex vertical gap={30}>
      <Setting setStep={setStep} />
      <SetContents step={step} setStep={setStep} />
      <GetFirstSentence step={step} setStep={setStep} />
      <GetBody step={step} setStep={setStep} />
    </Flex>
  );
};

export default Thread;
