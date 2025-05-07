// src/styles/styled.d.ts
import "styled-components";
import { ThemeType } from "ai-surfers-design-system";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
