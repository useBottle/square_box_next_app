/** @jsxImportSource @emotion/react */

import { CSSObject } from "@emotion/react";

export const container: CSSObject = {
  display: "flex",
  justifyContent: "center",

  "& h1": {
    position: "absolute",
    top: "15rem",
    fontSize: "2rem",
  },
  "& button": {
    position: "absolute",
    bottom: "15rem",
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
  },
};
