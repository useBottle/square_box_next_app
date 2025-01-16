import { CSSObject } from "@emotion/react";

export const header: CSSObject = {
  position: "fixed",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "5rem",
  zIndex: 999,
  padding: "0 2.5rem",
  background: "var(--reverse-font)",

  ".logo": {
    display: "flex",
    alignItems: "center",
    color: "var(--basic-font)",
    fontSize: "2rem",
  },

  ".menuBtn": {
    fontSize: "2rem",
    color: "var(--basic-font)",
    cursor: "pointer",
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "60vw",
    padding: 0,
    height: "6rem",

    ".logo": {
      fontSize: "2.5rem",
    },

    ".menuBtn": {
      fontSize: "2.5rem",
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    width: "50vw",
    height: "8rem",
  },

  "@media (min-width: 2000px)": {
    width: "40vw",
  },
};
