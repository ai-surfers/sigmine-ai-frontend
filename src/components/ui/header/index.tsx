"use client";

import { useUser } from "@/hooks/auth/useUser";
import { Flex } from "antd";
import LogoutButton from "./LogoutButton";
import Image from "next/image";
import Link from "next/link";
import { Button, Text } from "ai-surfers-design-system";
import { useEffect } from "react";
import { routedLogout } from "@/apis/auth/clientLogin";

const Header = () => {
  const { userData, resetUserState } = useUser();

  useEffect(() => {
    if (!userData.isLogin && window.location.pathname !== "/login") {
      routedLogout();
      resetUserState();
      window.location.href = "/login";
    }
  }, [userData.isLogin]);

  return (
    <Flex
      justify="space-between"
      align="center"
      gap={30}
      style={{ padding: "8px 24px", height: "52px" }}
    >
      <Link href="/">
        <Image src="/imgs/logo-symbol.png" alt="logo" width={48} height={48} />
      </Link>

      {userData.isLogin && (
        <Flex gap={12} align="center">
          <Button hierarchy="sigmineSecondary" size={36}>
            <Text font="b3_14_reg" color="G_800">
              {userData.email}
            </Text>
          </Button>
          <LogoutButton />
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
