/**@jsxImportSource @emotion/react */

"use client";

import { useEffect, useState } from "react";
import { FaCircleArrowUp } from "react-icons/fa6";
import { css, CSSObject } from "@emotion/react";

const scrollBtn: CSSObject = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "5rem",
  border: "none",
  fontSize: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--basic-font)",
  background: "transparent",
  cursor: "pointer",
  padding: 0,

  ".icon": {
    zIndex: 999,
  },

  ".iconBack": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    width: "90%",
    height: "90%",
    borderRadius: "50%",
  },
};

export default function ScrollBtn(): JSX.Element {
  const [btnSwitch, setBtnSwitch] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    // scrollTo 버튼 활성화 스크롤 이벤트 함수
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerHeight = 300;

      if (scrollPosition > triggerHeight) {
        setBtnSwitch(true);
      }

      if (scrollPosition <= triggerHeight) {
        setBtnSwitch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      css={css(scrollBtn)}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      style={!btnSwitch ? { display: "none" } : {}}
    >
      <FaCircleArrowUp className="icon" />
      <div className="iconBack" />
    </button>
  );
}
