import { CreateWorkspaceType } from "@/types/workspaces";
import { atom } from "recoil";

export const initialCreateWorkspaceState: CreateWorkspaceType = {
  step: 1,
  step1Res: null,
  step2Res: null,
  step3Res: null,
  step4Res: null,
};

export const createWorkspaceState = atom<CreateWorkspaceType>({
  key: "createWorkspaceState",
  default: initialCreateWorkspaceState,
});
