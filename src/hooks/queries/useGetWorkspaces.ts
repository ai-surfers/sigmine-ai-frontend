import { GET } from "@/apis/client";
import { WorkspaceListType } from "@/types/workspaces";
import { useQuery } from "@tanstack/react-query";

async function getWorkspaces() {
  const res = await GET<WorkspaceListType>(`/workspaces`);
  return res.data.data;
}

export const useGetWorkspacesQuery = () => {
  return useQuery<WorkspaceListType>({
    queryKey: ["workspaces"],
    queryFn: () => getWorkspaces(),
  });
};
