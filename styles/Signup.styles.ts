import { CSSObject } from "@emotion/react";
import { globalBtn, infoText, infoTitle, input } from "./default.styles";

export const signup: CSSObject = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  "& .logo": {
    margin: "2rem 0",
    width: "4rem",
    height: "4rem",
    background: "var(--main-color)",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    color: "#fff",
  },

  "& h1": {
    ...infoTitle,
    margin: "1rem 0",
  },

  "& p": {
    ...infoText,
    margin: "1rem 0",
  },

  "& form": {
    marginTop: "2rem",

    "& input": {
      ...input,
    },

    "& p": {
      fontSize: "1.2rem",
      color: "red",
      marginBottom: "2.5rem",
    },

    "& button": {
      ...globalBtn,
      background: "var(--main-color)",
      color: "#fff",
      marginTop: "4rem",
    },
  },

  "& .guideSignin": {
    marginTop: "3rem",
    fontSize: "1.2rem",
    color: "var(--shadow-color)",

    "& .signinBtn": {
      margin: "2rem 0.5rem",
      fontSize: "1.2rem",
      color: "var(--basic-font)",
      borderBottom: "1px solid var(--basic-font)",
      textAlign: "center",
    },
  },
};
