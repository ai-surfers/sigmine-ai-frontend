import { useUser } from "@/hooks/useUser";
import { LOCALSTORAGE_KEYS, removeLocalStorage } from "@/utils/storageUtils";
import Link from "next/link";
import React from "react";
import { Button, Text } from "ai-surfers-design-system";

const LogoutButton = () => {
  const { resetUserState } = useUser();

  function handleLogout() {
    removeLocalStorage(LOCALSTORAGE_KEYS.TEAM_CODE);
    resetUserState();
  }

  return (
    <Link href="/">
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
    </Link>
  );
};

export default LogoutButton;
