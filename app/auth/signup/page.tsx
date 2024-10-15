/** @jsxImportSource @emotion/react */

"use client";

import { container } from "@/styles/Signup.styles";
import { css } from "@emotion/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || name === "" || password === "") {
      return;
    }

    try {
      await axios.post("/api/signup", { email: email, name: name, password: password });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div css={css(container)}>
      <div className="logo">
        <IoPersonOutline />
      </div>
      <h1>회원가입</h1>
      <p>양식을 작성해주세요</p>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <p>이메일 형식이 아닙니다</p>
        <input
          name="name"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <p>영문 또는 한글로만 입력해야 합니다</p>
        <input
          name="password"
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <p>비밀번호는 8자 이상이어야 합니다</p>
        <button type="submit">회원 가입</button>
      </form>
      <p className="guideSignin">
        계정이 이미 있으신가요?
        <Link href="/auth/signin" className="signinBtn">
          로그인
        </Link>
      </p>
    </div>
  );
}
