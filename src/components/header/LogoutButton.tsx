import { useUser } from "@/hooks/useUser";
import { LOCALSTORAGE_KEYS, removeLocalStorage } from "@/utils/storageUtils";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import React from "react";

const LogoutButton = () => {
  const { resetUserState } = useUser();

  function handleLogout() {
    removeLocalStorage(LOCALSTORAGE_KEYS.TEAM_CODE);
    resetUserState();
  }

  return (
    <Link href="/">
      <Button style={{ justifyContent: "center" }} onClick={handleLogout}>
        로그아웃
      </Button>
    </Link>
  );
};

export default LogoutButton;
