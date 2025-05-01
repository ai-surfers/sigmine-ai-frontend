import { useUser } from "@/hooks/useUser";
import { LOCALSTORAGE_KEYS, removeLocalStorage } from "@/utils/storageUtils";
import Link from "next/link";
import React from "react";
import { Button } from "ai-surfers-design-system";

const LogoutButton = () => {
  const { resetUserState } = useUser();

  function handleLogout() {
    removeLocalStorage(LOCALSTORAGE_KEYS.TEAM_CODE);
    resetUserState();
  }

  return (
    <Link href="/">
      <Button
        hierarchy="sigminePrimary"
        size={44}
        style={{ justifyContent: "center" }}
        onClick={handleLogout}
      >
        로그아웃
      </Button>
    </Link>
  );
};

export default LogoutButton;
