"use client";

import { userState } from "@/states/userState";
import { UserType } from "@/types/auth";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface RecoilProviderProps {
  children: ReactNode;
  user: UserType | null;
}

export default function RecoilProvider({
  children,
  user,
}: RecoilProviderProps) {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        if (user) set(userState, user);
      }}
    >
      {children}
    </RecoilRoot>
  );
}
