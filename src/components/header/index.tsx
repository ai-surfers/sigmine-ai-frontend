"use client";

import { useAutoLogin } from "@/hooks/useAutoLogin";
import { useUser } from "@/hooks/useUser";
import { Flex } from "antd";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { userData } = useUser();
  useAutoLogin();
  return (
    <Flex
      justify="end"
      align="center"
      gap={30}
      style={{ padding: "10px 20px" }}
    >
      {userData.teamName}
      <LogoutButton />
    </Flex>
  );
};

export default Header;
