/**@jsxImportSource @emotion/react */

"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { css, CSSObject, keyframes } from "@emotion/react";

const wave = keyframes({
  "0%": {
    width: "2rem",
    height: "2rem",
    opacity: 1,
  },
  "50%": {
    width: "4rem",
    height: "4rem",
    opacity: 1,
  },
  "100%": {
    width: "5rem",
    height: "5rem",
    opacity: 0,
  },
});

const scrollBtn: CSSObject = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "5rem",
  border: "none",
  borderRadius: "50%",
  fontSize: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "var(--reverse-font)",
  background: "var(--basic-font)",
  cursor: "pointer",
  padding: "1rem",
  zIndex: 999,

  ".circle": {
    position: "absolute",
    width: "1.5rem",
    height: "1.5rem",
    border: "1px solid var(--basic-font)",
    borderRadius: "50%",
    animation: `${wave} 2s infinite ease-out`,
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
      <FaArrowUp />
      <div className="circle" />
    </button>
  );
}
