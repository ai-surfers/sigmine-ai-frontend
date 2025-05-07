import { Button } from "ai-surfers-design-system";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
  return (
    <Link href="/">
      <Button size={44} hierarchy="sigminePrimary">
        로그인
      </Button>
    </Link>
  );
};

export default LoginButton;
