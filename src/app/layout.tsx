import type { Metadata } from "next";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import RecoilProvider from "../providers/RecoilProvider";
import StyledComponentProvider from "../providers/StyledComponentProvider";
import LayoutContainer from "@/components/layouts/LayoutContainer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentProvider>
          <ReactQueryProvider>
            <RecoilProvider>
              <LayoutContainer>{children}</LayoutContainer>
            </RecoilProvider>
          </ReactQueryProvider>
        </StyledComponentProvider>
      </body>
    </html>
  );
}
