/** @jsxImportSource @emotion/react */

import { CSSObject } from "@emotion/react";
import { globalBtn } from "./default.styles";

export const nav: CSSObject = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  background: "var(--background)",
  zIndex: 999,

  "& ul": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",

    "& .list": {
      width: "20rem",
      height: "5rem",
      // border: "1px solid #eee",
      borderRadius: "5px",
      background: "transparent",
      margin: "1rem 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.6rem",
      color: "var(--basic-font)",
      transform: "translateY(-5rem)",
    },

    "& .btn": {
      marginTop: "5rem",
      border: "none",
      borderRadius: "5px",
      background: "var(--main-color)",
      color: "var(--reverse-font)",
      width: "90vw",
      height: "5rem",
      fontSize: "1.4rem",
      transform: "translateY(-5rem)",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};
