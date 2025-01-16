import { CSSObject } from "@emotion/react";

export const header: CSSObject = {
  position: "fixed",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "var(--background)",
  zIndex: 999,

  ".headerWrapper": {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "5rem",
    padding: "0 2.5rem",

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
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    ".headerWrapper": {
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
  },

  // 데스크탑 뷰 1200px 이상
  "@media (min-width: 1200px)": {
    ".headerWrapper": {
      width: "50vw",
      height: "8rem",
    },
  },

  // 데스크탑 뷰 2000px 이상
  "@media (min-width: 2000px)": {
    ".headerWrapper": {
      width: "40vw",
    },
  },
};
