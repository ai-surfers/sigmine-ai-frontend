"use client";

import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import { Text } from "ai-surfers-design-system";
import { useDeviceSize } from "@/providers/DeviceContext";

export type StepIndicatorType = {
  label: string;
  path: string;
};

type StepIndicatorProps = {
  steps: StepIndicatorType[];
};

export const SETTING_STEPS: StepIndicatorType[] = [
  { label: "스레드 톤&성격 설정", path: "/setting" },
  { label: "첫 문장 선택 및 콘텐츠 생성", path: "/home" },
];

const StepIndicator = ({ steps }: StepIndicatorProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const current = steps.findIndex((step) => pathname === step.path);

  const { isMobile } = useDeviceSize();

  return (
    <StepWrapper>
      {steps.map((step, index) => (
        <StepItem
          key={index}
          $isActive={index === current}
          onClick={() => router.push(step.path)}
        >
          <Circle $isActive={index === current}>{index + 1}</Circle>
          <Text
            font={
              isMobile
                ? index === current
                  ? "c1_12_semi"
                  : "c1_12_med"
                : index === current
                ? "b3_14_semi"
                : "b3_14_med"
            }
            color={index === current ? "G_600" : "G_300"}
            style={{ whiteSpace: "nowrap" }}
          >
            {step.label}
          </Text>
        </StepItem>
      ))}
    </StepWrapper>
  );
};

export default StepIndicator;

const StepWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.G_100};
  border-radius: 8px;
  width: 100%;
  max-width: 392px;
  padding: 4px;
  margin-top: 24px;
  margin-bottom: 24px;
  height: 45px;
`;

const StepItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 20px 8px 16px;
  border-radius: 6px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.G_100};
  transition: all 0.2s;
  gap: 8px;
  cursor: pointer;
  width: 80%;
  max-width: 210px;
`;

const Circle = styled.div<{ $isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.G_600 : theme.colors.G_300};
  color: white;
  ${({ theme }) => theme.fonts.c1_12_med};
  display: flex;
  align-items: end;
  text-align: center;
  justify-content: center;
  margin-right: 6px;
`;
