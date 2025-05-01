"use client";

import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import GlobalStyle from "@/app/globalStyle";
import StyledComponentsRegistry from "./StyledComponentRegistry";
import { theme } from "ai-surfers-design-system";

interface StylesProps {
  children: React.ReactNode;
}

const Styles = ({ children }: StylesProps) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7580EA",
              fontFamily: "Pretendard",
            },
            components: {
              Typography: {
                titleMarginBottom: "10px",
                titleMarginTop: 0,
              },
              Select: {
                optionSelectedColor: "#7580EA",
                optionSelectedBg: "#F2F3FD",
              },
            },
          }}
        >
          <GlobalStyle />
          {children}
        </ConfigProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Styles;
