import { ThreadsStateType } from "@/types/threads";
import { CreateWorkspaceType } from "@/types/workspaces";
import { atom } from "recoil";

export const initialCreateWorkspaceState = {
  step: 1,
};

export const createWorkspaceState = atom<CreateWorkspaceType>({
  key: "createWorkspaceState",
  default: initialCreateWorkspaceState,
});
