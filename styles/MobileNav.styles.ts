/** @jsxImportSource @emotion/react */

import { CSSObject } from "@emotion/react";

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
    transform: "translateY(-5rem)",

    "& .list": {
      width: "90vw",
      height: "5rem",
      background: "transparent",
      borderBottom: "1px solid #eee",
      margin: "1rem 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "1.6rem",
      color: "var(--basic-font)",
    },

    "& .auth": {
      width: "90vw",
      height: "5rem",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "1px solid #eee",
      background: "transparent",
      color: "var(--basic-font)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "1.6rem",
      margin: "1rem 0",
      padding: "0 0",
    },
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
