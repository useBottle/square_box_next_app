/** @jsxImportSource @emotion/react */

import { CSSObject } from "@emotion/react";

export const nav: CSSObject = {
  position: "fixed",
  width: "100vw",
  height: "100vh",
  background: "var(--background)",
  zIndex: 999,
};

export const menuIcon: CSSObject = {
  marginRight: "1rem",
  color: "var(--main-color)",
};

export const menuUl: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
};

export const menuList: CSSObject = {
  width: "20rem",
  height: "5rem",
  border: "1px solid #eee",
  borderRadius: "5px",
  background: "transparent",
  margin: "1rem 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.4rem",
  color: "var(--basic-font)",
  transform: "translateY(-5rem)",
};

export const signinBtn: CSSObject = {
  marginTop: "5rem",
  border: "none",
  borderRadius: "5px",
  background: "var(--main-color)",
  color: "var(--reverse-font)",
  width: "20rem",
  height: "5rem",
  fontSize: "1.4rem",
  transform: "translateY(-5rem)",
  justifyContent: "center",
  alignItems: "center",
};

export const signoutBtn: CSSObject = {
  marginTop: "5rem",
  border: "none",
  borderRadius: "5px",
  background: "var(--main-color)",
  color: "var(--reverse-font)",
  width: "20rem",
  height: "5rem",
  fontSize: "1.4rem",
  transform: "translateY(-5rem)",
  justifyContent: "center",
  alignItems: "center",
};
