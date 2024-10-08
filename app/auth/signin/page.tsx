"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in with Credentials</button>
      </form>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("kakao")}>Sign in with Kakao</button>
      <Link href="/auth/signup">회원 가입</Link>
    </div>
  );
}
