"use client";

import React, { useState } from "react";
import Setting from "./Setting";
import GetFirstSentence from "./GetFirstSentence";

export type StepType = 1 | 2 | 3;

const Thread = () => {
  const [step, setStep] = useState<StepType>(1);
  return (
    <div>
      <Setting setStep={setStep} />

      <GetFirstSentence step={step} setStep={setStep} />
    </div>
  );
};

export default Thread;
