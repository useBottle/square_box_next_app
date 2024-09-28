"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export default function Signin(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
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
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.target.value;
          }}
        />
        <button type="submit">Sign in with Credentials</button>
      </form>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("kakao")}>Sign in with Kakao</button>
    </div>
  );
}
