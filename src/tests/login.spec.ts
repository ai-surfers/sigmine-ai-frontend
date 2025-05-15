import { test, expect } from "@playwright/test";
import path from "path";

const storagePath = path.resolve(__dirname, "../storage/user.json");
test.describe("로그인 테스트", () => {
  test("1. 사용자의 입력으로 로그인하기", async ({ browser }) => {
    const context = await browser.newContext(); // ✅ 쿠키 없이 새 context 생성
    const page = await context.newPage();
    await context.clearCookies(); // 기존 쿠키 날리기

    await page.goto("http://localhost:3000/");

    // 로그인 페이지로 리디렉션 확인
    await page.waitForURL("**/login", { timeout: 5000 });

    // 팀 코드 입력 후 로그인 버튼 클릭
    await page.fill(
      'input[placeholder="팀 코드를 입력해주세요"]',
      "yoonkwon_ai"
    );
    await page.click('button:has-text("로그인")');

    // 로그인 후 페이지 이동 확인
    await page.waitForURL("**/", { timeout: 5000 });
    await expect(page).toHaveURL(/\//);

    // 현재 브라우저 상태(localStorage)를 저장
    await context.storageState({ path: storagePath });
  });

  test.use({ storageState: storagePath });
  test("2. 쿠키 기반 자동 로그인하기", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    // 자동 로그인 됐는지 확인 (홈으로 리디렉션)
    await page.waitForURL("**/", { timeout: 5000 });
    await expect(page).toHaveURL(/\//);
  });
});
