"use client";

import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useUser } from "@/hooks/useUser";
import { Flex } from "antd";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { userData } = useUser();
  useAutoLogin();

  return (
    <Flex
      justify="space-between"
      align="center"
      gap={30}
      style={{ padding: "8px 24px", height: "52px" }}
    >
      <Link href="/home">
        <Image src="/imgs/logo-symbol.png" alt="logo" width={48} height={48} />
      </Link>

      {userData.isLogin ? (
        <>
          {userData.teamName}
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </Flex>
  );
};

export default Header;
