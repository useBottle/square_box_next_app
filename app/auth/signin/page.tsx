/** @jsxImportSource @emotion/react */

"use client";

import { signin } from "@/styles/Signin.styles";
import { css } from "@emotion/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { IoLockOpenOutline } from "react-icons/io5";

export default function Signin(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
    });

    if (result?.error) {
      console.log(result.error);

      if (result.error.includes("social account")) {
        router.push("/auth/social-redirect");
      }
    }
  };

  return (
    <div css={css(signin)}>
      <div className="logo">
        <IoLockOpenOutline />
      </div>
      <h1>로그인</h1>
      <p>일부 서비스를 위해서는 로그인이 필요합니다</p>
      <form onSubmit={handleSubmit}>
        <div className="credentialsFields">
          <input
            name="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <p className="guideSignup">
        아직 회원이 아니신가요?
        <Link href="/auth/signup" className="signupBtn">
          회원 가입
        </Link>
      </p>
      <div className="middleLine">
        <span>or</span>
      </div>
      <button onClick={() => signIn("google")} className="googleBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48">
          <path
            fill="#ffc107"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
          />
          <path
            fill="#ff3d00"
            d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
          />
          <path
            fill="#4caf50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
          />
          <path
            fill="#1976d2"
            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
          />
        </svg>
        <span>구글 로그인</span>
      </button>
      <button onClick={() => signIn("kakao")} className="kakaoBtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path
            fill="#131200"
            d="M12 3c5.8 0 10.501 3.664 10.501 8.185c0 4.52-4.701 8.184-10.5 8.184a14 14 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866c0-4.52 4.7-8.185 10.5-8.185m5.908 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.5.5 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413l1.428 2.033a.472.472 0 1 0 .773-.543zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944m-5.857-1.091l.696-1.708l.638 1.707zm2.523.487l.002-.016a.47.47 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474a.7.7 0 0 0-.653.447l-1.662 4.075a.472.472 0 0 0 .874.357l.332-.813h2.07l.298.8a.472.472 0 1 0 .884-.33zM8.294 9.302a.47.47 0 0 0-.471-.472H4.578a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14a.47.47 0 0 0 .472-.472"
          />
        </svg>
        <span>카카오 로그인</span>
      </button>
    </div>
  );
}
