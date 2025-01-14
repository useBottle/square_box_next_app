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
import { findUser } from "@/app/actions/findUserActions";

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<"" | "email" | "name" | "password" | string>("");
  const [userExists, setUserExists] = useState<"exists" | "not exists" | "default">("default");
  const [isDuplicateLoading, setIsDuplicateLoading] = useState<boolean>(false);
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false);
  const router = useRouter();

  // 이메일: 영문 대, 소문자, 숫자로 시작하고 @, . 기호 포함 + 빈 문자열 허용
  const emailCondition = /^[A-Za-z-0-9\-\.]+@[A-Ja-z-0-9\-\.]+\.[A-Ja-z-0-9]+$|^$/;
  // 이름: 영문 대, 소문자, 한글 3~20자 + 빈 문자열 허용
  const nameCondition = /^[a-zA-Z가-힣]{3,20}$|^$/;
  // 패스워드: 대문자, 소문자, 숫자, 특수문자 각각 1개 이상을 포함한 8자 이상 + 빈 문자열 허용
  const passwordCondition = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$|^$/;

  const signupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 각 input 필드 중 하나라도 입력되지 않은 경우
    if (email === "" || name === "" || password === "") {
      alert("이메일, 이름, 패스워드를 모두 입력해야 합니다.");
      return;
    }

    // 각 input 필드가 조건에 모두 맞지만 이메일이 이미 존재하는 경우
    if (
      emailCondition.test(email) &&
      nameCondition.test(name) &&
      passwordCondition.test(password) &&
      (userExists === "exists" || userExists == "default")
    ) {
      userExists === "exists" && alert("입력하신 이메일은 이미 사용중입니다.\n다른 이메일로 가입해주세요.");
      userExists == "default" && alert("이메일 중복 확인을 진행해주세요");
      return;
    }

    // 각 input 필드가 하나라도 조건에 맞지 않을 경우
    if (!emailCondition.test(email) || !nameCondition.test(name) || !passwordCondition.test(password)) {
      alert("회원가입 양식 조건에 맞지 않습니다");
      return;
    }

    try {
      setIsSignupLoading(true);
      const result = await axios.post("/api/signup", { email: email, name: name, password: password });
      setIsSignupLoading(false);
      result.data.userExists && alert("이메일이 이미 사용중입니다.\n다른 이메일로 가입해주세요.");
      result.status !== 200 &&
        result.data.userExists === undefined &&
        alert("회원가입 과정에 문제가 생겼습니다.\n다시 시도해주세요.");
      if (result.status === 200 && result.data.userExists === undefined) {
        alert("회원가입에 성공했습니다");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const duplicateConfirm = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // 이메일 필드가 입력되지 않았거나 조건에 맞지 않을 경우
    if (email === "") return;
    if (!emailCondition.test(email)) return;

    try {
      setIsDuplicateLoading(true);
      const result = await findUser(email);

      if (result?.exists) {
        setUserExists("exists");
        alert("이메일이 이미 사용중입니다");
      }

      if (!result?.exists) {
        setUserExists("not exists");
        alert("사용가능한 이메일입니다");
      }
      setIsDuplicateLoading(false);
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
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setUserExists("default");
      },
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
      infoElement: <p>영문 또는 한글로 3~20자여야 합니다</p>,
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
    <div css={css(signup)}>
      <div className="logo">
        <IoPersonOutline />
      </div>
      <h1>회원가입</h1>
      <p>양식을 작성해주세요</p>
      <form onSubmit={signupSubmit}>
        {inputArray.map((input) => {
          return (
            <div key={input.field}>
              <div
                className="inputContainer"
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
                  onBlur={() => setInputFocused("")}
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                />
                {input.value !== "" && input.condition.test(input.value) && (
                  // 스타일 조건에 이메일 중복 확인 후 상태 변경된 값으로 추가 적용해야함
                  <FaCircleCheck
                    className="checkIcon"
                    style={
                      (input.field === "email" && userExists === "exists") || userExists === "default"
                        ? { display: "none" }
                        : {}
                    }
                  />
                )}
              </div>
              {input.field === "email" &&
                email !== "" &&
                emailCondition.test(email) &&
                (userExists === "default" || userExists === "exists") && (
                  <button
                    className="duplicateBtn"
                    onClick={duplicateConfirm}
                    style={
                      isDuplicateLoading
                        ? { border: "1px solid var(--shadow-color)", background: "var(--reverse-font)" }
                        : {}
                    }
                  >
                    {isDuplicateLoading ? <div className="spinner" /> : "중복 확인"}
                  </button>
                )}
              {!input.condition.test(input.value) ? input.infoElement : <p></p>}
            </div>
          );
        })}
        <button
          type="submit"
          className="signupBtn"
          style={isSignupLoading ? { border: "1px solid var(--shadow-color)", background: "var(--reverse-font)" } : {}}
        >
          {isSignupLoading ? <div className="spinner" /> : "회원가입"}
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
