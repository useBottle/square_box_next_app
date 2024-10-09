/** @jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { setSignoutModal } from "@/store/switches";
import { modal } from "@/styles/SignoutModal.styles";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function SignoutModal(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { signoutModal } = useSelector((state: RootState) => state.switches);

  const onClick = () => {
    signOut();
    router.push("/");
  };

  return (
    <div css={modal}>
      <div className="signoutModalBox">
        <h1>로그아웃 하시겠습니까?</h1>
        <div className="btnGroup">
          <button onClick={() => dispatch(setSignoutModal(signoutModal ? false : true))}>취소</button>
          <button className="signout" onClick={onClick}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
