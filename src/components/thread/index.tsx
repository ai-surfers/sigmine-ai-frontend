"use client";

import React, { useEffect, useRef } from "react";
import GetFirstSentence from "./GetFirstSentence";
import GetBody from "./GetBody";
import { Flex } from "antd";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import StepIndicator, { SETTING_STEPS } from "../ui/Step";

const Thread = () => {
  const { userData } = useUser();
  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null); // 단계 이동시 스크롤할 때 사용할 ref

  useEffect(() => {
    if (!userData?.isLogin) {
      router.push("/"); // 유저 정보 없을 경우 루트로 이동
    }
  }, [userData]);

  return (
    <Flex
      ref={bodyRef}
      vertical
      gap={30}
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        scrollBehavior: "smooth",
        padding: "0 60px",
      }}
    >
      <StepIndicator steps={SETTING_STEPS} />
      <GetFirstSentence scrollRef={bodyRef} />
      <GetBody scrollRef={bodyRef} />
    </Flex>
  );
};

export default Thread;
