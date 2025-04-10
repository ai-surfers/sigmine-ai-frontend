import { GET } from "@/apis/client";
import { LoginResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export async function login(teamCode: string) {
  const res = await GET<LoginResponse>(`/teams/login`, {
    headers: {
      "team-code": teamCode,
    },
  });

  return res.data.data;
}

export const useLogin = (teamCode: string) => {
  return useQuery<LoginResponse>({
    queryKey: ["login", teamCode],
    queryFn: () => login(teamCode),
    enabled: !!teamCode,
  });
};
