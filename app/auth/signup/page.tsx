/** @jsxImportSource @emotion/react */

"use client";

import { signup } from "@/styles/Signup.styles";
import { css } from "@emotion/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<"" | "email" | "name" | "password" | string>("");
  const router = useRouter();

  // 이메일: 영문 대, 소문자, 숫자로 시작하고 @, . 기호 포함 + 빈 문자열 허용
  const emailCondition = /^[A-Za-z-0-9\-\.]+@[A-Ja-z-0-9\-\.]+\.[A-Ja-z-0-9]+$|^$/;
  // 이름: 영문 대, 소문자, 한글 4~20자 + 빈 문자열 허용
  const nameCondition = /^[a-zA-Z가-힣]{4,20}$|^$/;
  // 패스워드: 대문자, 소문자, 숫자, 특수문자 각각 1개 이상을 포함한 8자 이상 + 빈 문자열 허용
  const passwordCondition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$|^$/;

  const signupSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const duplicateSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" && !emailCondition.test(email)) return;

    try {
    } catch (error) {
      console.error(error);
    }
  };

  const inputArray = [
    {
      field: "email",
      type: "text",
      placeholder: "이메일",
      value: email,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      condition: emailCondition,
      infoElement: <p>이메일 형식으로 입력해야 합니다</p>,
    },
    {
      field: "name",
      type: "text",
      placeholder: "이름",
      value: name,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      condition: nameCondition,
      infoElement: <p>영문 또는 한글로 4~20자여야 합니다</p>,
    },
    {
      field: "password",
      type: "password",
      placeholder: "패스워드",
      value: password,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      condition: passwordCondition,
      infoElement: (
        <p>
          비밀번호는 영문 대문자, 숫자, 특수문자 각각 1자 이상 포함한 <br /> 8자 이상이어야 합니다
        </p>
      ),
    },
  ];

  return (
    <div
      css={css(signup)}
      onClick={(e: MouseEvent) => {
        e.stopPropagation();
        setInputFocused("");
      }}
    >
      <div className="logo">
        <IoPersonOutline />
      </div>
      <h1>회원가입</h1>
      <p>양식을 작성해주세요</p>
      <form onSubmit={signupSubmit}>
        {inputArray.map((input) => {
          return (
            <>
              <div
                className="inputContainer"
                key={input.field}
                style={
                  inputFocused === input.field
                    ? { border: "1.5px solid var(--main-color)", transition: "ease 0.3s" }
                    : { border: "1.5px solid transparent" }
                }
              >
                <input
                  name={input.field}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={input.onChange}
                  onFocus={() => setInputFocused(input.field)}
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                />
                {input.value !== "" && input.condition.test(input.value) && (
                  // 스타일 조건에 이메일 중복 확인 후 상태 변경된 값으로 추가 적용해야함
                  <FaCircleCheck className="checkIcon" style={input.field === "email" ? { display: "none" } : {}} />
                )}
              </div>
              {input.field === "email" && email !== "" && emailCondition.test(email) && (
                <form className="duplicateForm" onSubmit={duplicateSubmit}>
                  <button type="submit" className="duplicateBtn">
                    중복 확인
                  </button>
                </form>
              )}
              {!input.condition.test(input.value) ? input.infoElement : <p></p>}
            </>
          );
        })}
        <button type="submit" className="signupBtn">
          회원 가입
        </button>
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
