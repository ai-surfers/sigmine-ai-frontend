import { CreateWorkspaceType } from "@/types/workspaces";
import { atom } from "recoil";

export const initialCreateWorkspaceState: CreateWorkspaceType = {
  step: 1,
  step1Res: "",
  step2Res: "",
  step3Res: "",
};

export const createWorkspaceState = atom<CreateWorkspaceType>({
  key: "createWorkspaceState",
  default: initialCreateWorkspaceState,
});
