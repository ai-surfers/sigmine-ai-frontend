import { IconNameType } from "ai-surfers-design-system";

export interface WorkspaceType {
  id: string;
  name: string;
  industry: string;
  company_size: string;
  website: string;
  created_at: string;
}

export interface WorkspaceListType {
  items: WorkspaceType[];
}

export type IndustryKey =
  | "Consulting"
  | "Education"
  | "Finance"
  | "Healthcare"
  | "Media"
  | "Technology"
  | "Retail"
  | "Other";

export type IndustryValue = {
  ko: string;
  emoji: IconNameType;
};

export type SizeKey = "1" | "2-5" | "6-30" | "31-100" | "101-500" | "501";
export interface CreateWorkspaceStepType {
  step: number;
  step1Res: IndustryKey | null;
  step2Res: SizeKey | null;
  step3Res: string | null;
  step4Res: string | null;
}

export interface PostWorkspaceParamType {
  workspace_name: string;
  industry: IndustryKey;
  company_size: SizeKey;
  website: string;
}

export interface PostWorkspaceResType {
  id: string;
  name: string;
  industry: IndustryKey;
  company_size: SizeKey;
  website: string;
  created_at: string;
}
