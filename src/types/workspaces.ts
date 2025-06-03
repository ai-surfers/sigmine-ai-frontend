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

export interface CreateWorkspaceType {
  step: number;
}
