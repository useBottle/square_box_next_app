import { CSSObject } from "@emotion/react";

export const youtube: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",

  "& a": {
    width: "90%",
    margin: "4rem 0",

    "& li": {
      width: "100%",

      "& img": {
        width: "100%",
      },

      "& h1": {
        fontSize: "2rem",
        color: "var(--basic-font)",
        margin: "1rem 0",
      },
    },
  },
};
