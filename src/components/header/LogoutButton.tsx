import { useUser } from "@/hooks/useUser";
import React from "react";
import { Button, Text } from "ai-surfers-design-system";
import { useRouter } from "next/navigation";
import { routedLogout } from "@/apis/auth/clientLogin";

const LogoutButton = () => {
  const { resetUserState } = useUser();
  const route = useRouter();

  function handleLogout() {
    routedLogout();
    resetUserState();
    window.location.href = "/login";
  }

  return (
    <Button
      hierarchy="default"
      size={36}
      style={{ justifyContent: "center" }}
      onClick={handleLogout}
    >
      <Text font="c1_12_semi" color="G_400">
        로그아웃
      </Text>
    </Button>
  );
};

export default LogoutButton;
