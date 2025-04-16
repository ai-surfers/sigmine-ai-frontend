import { test, expect } from "@playwright/test";

test("홈페이지가 잘 열리는지 확인", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/sigmine-ai/i); // 타이틀에 이 문자열 포함되어야 함
});
