"use client";

import React, { useState } from "react";
import Setting from "./Setting";
import GetFirstSentence from "./GetFirstSentence";
import SetContents from "./SetContents";
import GetBody from "./GetBody";

export type StepType = 1 | 2 | 3 | 4;

const Thread = () => {
  const [step, setStep] = useState<StepType>(1);
  return (
    <div>
      <Setting setStep={setStep} />
      <SetContents step={step} setStep={setStep} />
      <GetFirstSentence step={step} setStep={setStep} />
      <GetBody step={step} setStep={setStep} />
    </div>
  );
};

export default Thread;
