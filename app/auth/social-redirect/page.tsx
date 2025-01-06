/** @jsxImportSource @emotion/react */

"use client";

import { useRouter } from "next/navigation";
import { css } from "@emotion/react";
import { container } from "@/styles/SocialRedirection.styles";

export default function SocialRedirect(): JSX.Element {
  const router = useRouter();

  return (
    <div css={css(container)}>
      <h1>소셜 계정이 이미 존재합니다</h1>
      <button onClick={() => router.push("/auth/signin")}>다시 로그인하기</button>
    </div>
  );
}
