import type { Metadata } from "next";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import RecoilProvider from "../providers/RecoilProvider";
import StyledComponentProvider from "../providers/StyledComponentProvider";

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { detectDevice } from "@/utils/deviceUtils";
import { headers } from "next/headers";
import { DeviceProvider } from "@/providers/DeviceContext";


export const metadata: Metadata = {
  title: "Sigmine AI",
  description: "Work smarter, with your AI employees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isMobile, isUnderTablet } = detectDevice(
    headers().get("user-agent") || ""
  );
  return (
    <DeviceProvider isUnderTablet={isUnderTablet} isMobile={isMobile}>
      <html lang="en">
        <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StyledComponentProvider>
            <ReactQueryProvider>
              <RecoilProvider>
                <LayoutWrapper>{children}</LayoutWrapper>
              </RecoilProvider>
            </ReactQueryProvider>
          </StyledComponentProvider>
        </body>
      </html>
    </DeviceProvider>

  );
}
