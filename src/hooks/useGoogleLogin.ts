import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, PROVIDER } from "@/apis/firebase";
import { login } from "@/apis/auth/clientlogin";

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 구글 로그인 후 구글 액세스 토큰 획득
      const popupRes = await signInWithPopup(auth, PROVIDER);
      const token =
        GoogleAuthProvider.credentialFromResult(popupRes)?.accessToken;
      const user = popupRes.user;

      if (!token) throw new Error("Google token missing");

      // 구글 액세스 토큰을 서비스 액세스 토큰으로 변경
      const serviceRes = await login(token);
      const accessToken = serviceRes.data.data?.access_token;

      if (!accessToken) throw new Error("App token missing");

      // 서비스 액세스 토큰 쿠키에 저장
      await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginWithGoogle, isLoading, error };
};
