"use client";

import { signIn } from "next-auth/react";

export default function Signin() {
  return (
    <div>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("kakao")}>Sign in with Kakao</button>
    </div>
  );
}
