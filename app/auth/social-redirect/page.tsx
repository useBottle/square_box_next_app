"use client";

import { useRouter } from "next/navigation";

export default function SocialRedirect(): JSX.Element {
  const router = useRouter();

  return (
    <div>
      <div>소셜 계정이 이미 존재합니다.</div>
      <button onClick={() => router.push("/auth/signin")}>다시 로그인하기</button>
    </div>
  );
}
