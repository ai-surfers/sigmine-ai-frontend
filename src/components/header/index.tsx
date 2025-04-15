"use client";

import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useUser } from "@/hooks/useUser";
import { Button, Flex } from "antd";
import LogoutButton from "./LogoutButton";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { userData } = useUser();
  useAutoLogin();

  const route = useRouter();
  const pathname = usePathname();

  return (
    <Flex
      justify="end"
      align="center"
      gap={30}
      style={{ padding: "10px 20px" }}
    >
      {userData.teamName}
      <Button
        onClick={() =>
          route.push(pathname.includes("setting") ? `/home` : `/setting`)
        }
      >
        {pathname.includes("setting") ? "스레드 만들기" : "세팅하기"}
      </Button>
      <LogoutButton />
    </Flex>
  );
};

export default Header;
