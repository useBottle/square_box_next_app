import axios from "axios";
import { JWT } from "next-auth/jwt";

export default async function refreshAccessToken(token: JWT) {
  try {
    let url;

    const googleParams = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID!,
      refresh_token: token.refreshToken! as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    });

    const kakaoParams = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.KAKAO_CLIENT_ID!,
      refresh_token: token.refreshToken! as string,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
    });

    // 제공자에 따라 다른 토큰 엔드포인트로 요청
    if (token.provider === "google") {
      url = "https://oauth2.googleapis.com/token";
    } else if (token.provider === "kakao") {
      url = "https://kauth.kakao.com/oauth/token";
    } else {
      throw new Error("Unknown provider");
    }

    const response = await axios.post(url, token.provider === "google" ? googleParams : kakaoParams, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const refreshedTokens = await response.data;

    if (response.status < 200 || response.status >= 300) {
      throw new Error(refreshedTokens);
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: refreshedTokens.expires_in
        ? Date.now() + refreshedTokens.expires_in * 1000
        : refreshedTokens.expires_at,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 리프레시 토큰이 제공되지 않으면 기존 값 사용
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}
