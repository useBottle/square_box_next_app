import { CSSObject } from "@emotion/react";

export const input: CSSObject = {
  width: "100%",
  padding: "0.8rem 1.2rem",
  fontSize: "1.4rem",
  border: "1.5px solid transparent",
  borderRadius: "3px",
  boxSizing: "border-box",
  lineHeight: 1.5,
  background: "#eee",
  margin: "0.6rem 0",
  outline: "none",

  "&:focus": {
    border: "1.5px solid var(--main-color)",
    transition: "ease 0.3s",
  },
};

export const modalTitle: CSSObject = {
  fontSize: "2rem",
  color: "var(--basic-font)",
};

export const infoTitle: CSSObject = {
  fontSize: "2.2rem",
  color: "var(--basic-font)",
};

export const infoText: CSSObject = {
  fontSize: "1.4rem",
  color: "var(--basic-sub)",
};

export const globalBtn: CSSObject = {
  width: "100%",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "3px",
  fontSize: "1.4rem",
  boxSizing: "border-box",
  color: "#000",
};
