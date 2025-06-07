import {
  createWorkspaceState,
  initialCreateWorkspaceState,
} from "@/states/createWorkspaceState";
import { useRecoilState } from "recoil";
import {
  CreateWorkspaceStepType,
  IndustryKey,
  SizeKey,
} from "@/types/workspaces";

type ValidatedWorkspaceState = CreateWorkspaceStepType & {
  step1Res: IndustryKey;
  step2Res: SizeKey;
};

export const useWorkspaceStep = () => {
  const [workspaceStep, setWorkspaceStep] =
    useRecoilState(createWorkspaceState);

  const getCurrentStep = workspaceStep.step;

  const goBack = () => {
    setWorkspaceStep((prevState) => {
      const currentStep = prevState.step;
      const updatedState: CreateWorkspaceStepType = {
        ...prevState,
        step: currentStep - 1,
      };

      // 이전 단계의 결과를 초기화
      switch (currentStep) {
        case 2:
          updatedState.step1Res = null;
          break;
        case 3:
          updatedState.step2Res = null;
          break;
        case 4:
          updatedState.step3Res = null;
          break;
      }

      return updatedState;
    });
  };

  const goNext = () => {
    setWorkspaceStep((prevState) => ({
      ...prevState,
      step: prevState.step + 1,
    }));
  };

  const setStepResult = (step: number, result: any) => {
    setWorkspaceStep((prevState) => {
      const updatedState = { ...prevState };
      switch (step) {
        case 1:
          updatedState.step1Res = result;
          break;
        case 2:
          updatedState.step2Res = result;
          break;
        case 3:
          updatedState.step3Res = result;
          break;
        case 4:
          updatedState.step4Res = result;
          break;
      }
      return updatedState;
    });
  };

  const resetStep = () => {
    setWorkspaceStep(initialCreateWorkspaceState);
  };

  const isValid = (
    state: CreateWorkspaceStepType
  ): state is ValidatedWorkspaceState => {
    return state.step1Res !== null && state.step2Res !== null;
  };

  const getValidatedState = (): ValidatedWorkspaceState | null => {
    if (!isValid(workspaceStep)) return null;
    return workspaceStep as ValidatedWorkspaceState;
  };

  return {
    workspaceStep,
    getCurrentStep,
    goBack,
    goNext,
    setStepResult,
    resetStep,
    isValid,
    getValidatedState,
  };
};
