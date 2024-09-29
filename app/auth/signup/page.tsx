"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/signup", { email: email, name: name, password: password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
      />
      <input
        name="name"
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="패스워드"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
      <button type="submit">회원 가입</button>
    </form>
  );
}
