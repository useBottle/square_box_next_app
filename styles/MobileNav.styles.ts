/** @jsxImportSource @emotion/react */

import { CSSObject } from "@emotion/react";
import { globalBtn } from "./default.styles";

export const nav: CSSObject = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  background: "var(--background)",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  "& ul": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    transform: "translateY(-10rem)",

    "& .list": {
      width: "20rem",
      height: "5rem",
      borderRadius: "5px",
      background: "transparent",
      margin: "1rem 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.6rem",
      color: "var(--basic-font)",
    },
  },

  "& .btn": {
    ...globalBtn,
    background: "var(--main-color)",
    color: "#fff",
  },

  "& .guideSignup": {
    marginTop: "3rem",
    fontSize: "1.2rem",
    color: "var(--shadow-color)",

    "& .signupBtn": {
      margin: "2rem 0.5rem",
      fontSize: "1.2rem",
      color: "var(--basic-font)",
      borderBottom: "1px solid var(--basic-font)",
      textAlign: "center",
    },
  },
};
