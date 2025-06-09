import { CreateWorkspaceStepType } from "@/types/workspaces";
import { atom } from "recoil";

export const initialCreateWorkspaceState: CreateWorkspaceStepType = {
  step: 1,
  step1Res: null,
  step2Res: null,
  step3Res: null,
  step4Res: null,
};

export const createWorkspaceState = atom<CreateWorkspaceStepType>({
  key: "createWorkspaceState",
  default: initialCreateWorkspaceState,
});
