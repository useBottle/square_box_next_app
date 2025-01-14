/** @jsxImportSource @emotion/react */

"use client";

import { signup } from "@/styles/Signup.styles";
import { css } from "@emotion/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputClicked, setInputClicked] = useState<"" | "email" | "name" | "password">("");
  const router = useRouter();

  // 이메일: 영문 대, 소문자, 숫자로 시작하고 @, . 기호 포함 + 빈 문자열 허용
  const emailCondition = /^[A-Za-z-0-9\-\.]+@[A-Ja-z-0-9\-\.]+\.[A-Ja-z-0-9]+$|^$/;
  // 이름: 영문 대, 소문자, 한글 4~20자 + 빈 문자열 허용
  const nameCondition = /^[a-zA-Z가-힣]{4,20}$|^$/;
  // 패스워드: 대문자, 소문자, 숫자, 특수문자 각각 1개 이상을 포함한 8자 이상 + 빈 문자열 허용
  const passwordCondition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$|^$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || name === "" || password === "") {
      alert("이메일, 이름, 패스워드를 모두 입력해야 합니다.");
      return;
    }

    if (!emailCondition.test(email) || !nameCondition.test(name) || !passwordCondition.test(password)) {
      alert("회원가입 양식 조건에 맞지 않습니다");
      return;
    }

    try {
      await axios.post("/api/signup", { email: email, name: name, password: password });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(inputClicked);
  }, [inputClicked]);

  return (
    <div css={css(signup)}>
      <div className="logo">
        <IoPersonOutline />
      </div>
      <h1>회원가입</h1>
      <p>양식을 작성해주세요</p>
      <form onSubmit={handleSubmit}>
        <div
          className="inputContainer"
          onClick={() => setInputClicked("email")}
          style={
            inputClicked === "email"
              ? { border: "1.5px solid var(--main-color)", transition: "ease 0.3s" }
              : { border: "1.5px solid transparent" }
          }
        >
          <input
            name="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <FaCircleCheck className="checkIcon" />
        </div>
        {!emailCondition.test(email) ? <p>이메일 형식으로 입력해야 합니다</p> : <p></p>}
        <div
          className="inputContainer"
          onClick={() => setInputClicked("name")}
          style={
            inputClicked === "name"
              ? { border: "1.5px solid var(--main-color)", transition: "ease 0.3s" }
              : { border: "1.5px solid transparent" }
          }
        >
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <FaCircleCheck className="checkIcon" />
        </div>
        {!nameCondition.test(name) ? <p>영문 또는 한글로 4~20자여야 합니다</p> : <p></p>}
        <div
          className="inputContainer"
          onClick={() => setInputClicked("password")}
          style={
            inputClicked === "password"
              ? { border: "1.5px solid var(--main-color)", transition: "ease 0.3s" }
              : { border: "1.5px solid transparent" }
          }
        >
          <input
            name="password"
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <FaCircleCheck className="checkIcon" />
        </div>
        {!passwordCondition.test(password) ? (
          <p>
            비밀번호는 영문 대문자, 숫자, 특수문자 각각 1자 이상 포함한 <br /> 8자 이상이어야 합니다
          </p>
        ) : (
          <p></p>
        )}
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
