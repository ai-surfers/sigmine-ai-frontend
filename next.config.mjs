// next.config.mjs
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// env 파일 경로 설정
const envFilePath = path.resolve(
  __dirname,
  "sigmine-frontend-envs/.env.next." +
    (process.env.NODE_ENV || "development")
);

// 환경변수 로드
dotenv.config({ path: envFilePath });

// Next.js config 객체
const nextConfig = {
  env: {
    APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
  },
};

export default nextConfig;
