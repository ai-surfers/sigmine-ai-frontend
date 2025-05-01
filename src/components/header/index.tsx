"use client";

import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useUser } from "@/hooks/useUser";
import { Button, Flex } from "antd";
import LogoutButton from "./LogoutButton";
import { usePathname, useRouter } from "next/navigation";
import LoginButton from "./LoginButton";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { userData } = useUser();
  useAutoLogin();

  const route = useRouter();
  const pathname = usePathname();

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
