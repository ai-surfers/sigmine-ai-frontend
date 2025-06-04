import { CreateWorkspaceType } from "@/types/workspaces";
import { atom } from "recoil";

export const initialCreateWorkspaceState: CreateWorkspaceType = {
  step: 1,
  step1Res: "",
};

export const createWorkspaceState = atom<CreateWorkspaceType>({
  key: "createWorkspaceState",
  default: initialCreateWorkspaceState,
});
