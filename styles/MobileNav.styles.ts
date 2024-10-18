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

  "& .back": {
    position: "absolute",
    top: "1.5rem",
    right: "5%",
    fontSize: "2rem",
    color: "var(--basic-font)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  "& .logoPlate": {
    position: "absolute",
    top: "5rem",
    width: "90%",
    height: "4rem",
    marginBottom: "2rem",
    borderRadius: "3px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& .logo": {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      fontSize: "2rem",
      color: "#fff",
      zIndex: 100,
    },

    "& .overlay": {
      position: "absolute",
      width: "100%",
      height: "4rem",
      borderRadius: "3px",
      background: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(5px)",
      zIndex: 99,
    },

    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },

  "& ul": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

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
