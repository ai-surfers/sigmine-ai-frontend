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
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
            process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID:
            process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        // NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
        //     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
