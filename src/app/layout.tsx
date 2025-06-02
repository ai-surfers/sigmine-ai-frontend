import type { Metadata } from "next";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import RecoilProvider from "../providers/RecoilProvider";
import StyledComponentProvider from "../providers/StyledComponentProvider";

import LayoutWrapper from "@/components/ui/layout/LayoutWrapper";
import { detectDevice } from "@/utils/deviceUtils";
import { cookies, headers } from "next/headers";
import { DeviceProvider } from "@/providers/DeviceContext";
import { getCookie } from "@/utils/cookieUtils";
import { serverLogin, serverUserState } from "@/apis/auth/serverLogin";
import { UserType } from "@/types/auth";
import { redirect } from "next/navigation";
import { COOKIE_KEYS } from "@/utils/clientCookieUtils";

export const metadata: Metadata = {
  title: "Sigmine AI",
  description: "Work smarter, with your AI employees.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isMobile, isUnderTablet } = detectDevice(
    headers().get("user-agent") || ""
  );

  const teamCode = getCookie(COOKIE_KEYS.TEAM_CODE);
  const user = teamCode ? await serverUserState(teamCode) : null;
  console.log(user, teamCode);

  return (
    <DeviceProvider isUnderTablet={isUnderTablet} isMobile={isMobile}>
      <html lang="en">
        <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StyledComponentProvider>
            <ReactQueryProvider>
              <RecoilProvider user={user}>
                <LayoutWrapper>{children}</LayoutWrapper>
              </RecoilProvider>
            </ReactQueryProvider>
          </StyledComponentProvider>
        </body>
      </html>
    </DeviceProvider>
  );
}
