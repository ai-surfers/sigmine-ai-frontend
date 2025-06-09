import WorkSpaceNew from "@/components/workspaceNew";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";
import { getCookie } from "@/utils/cookieUtils";
import { redirect } from "next/navigation";
import React from "react";

const NewWorksapcePage = () => {
  if (!getCookie(COOKIE_KEYS.ACCESS_TOKEN)) redirect("/login");
  return <WorkSpaceNew />;
};

export default NewWorksapcePage;
