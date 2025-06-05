import { IconNameType } from "ai-surfers-design-system";

interface WorkspaceType {
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

export interface CreateWorkspaceType {
  step: number;
  step1Res: IndustryKey | "";
  step2Res: string;
  step3Res: string;
}
