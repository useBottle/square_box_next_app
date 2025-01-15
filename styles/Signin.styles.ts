import { CSSObject } from "@emotion/react";
import { globalBtn, infoText, infoTitle, input } from "./default.styles";

export const signin: CSSObject = {
  ".signinInfoContainer": {
    display: "none",
  },

  ".signinContainer": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    ".logo": {
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

    h1: {
      ...infoTitle,
      margin: "1rem 0",
    },

    p: {
      ...infoText,
      margin: "1rem 0",
    },

    form: {
      marginTop: "2rem",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      ".credentialsFields": {
        display: "flex",
        flexDirection: "column",
        width: "100%",

        input: {
          ...input,
        },
      },

      button: {
        ...globalBtn,
        background: "var(--main-color)",
        color: "#fff",
        marginTop: "4rem",
      },
    },

    ".guideSignup": {
      marginTop: "3rem",
      fontSize: "1.2rem",
      color: "var(--shadow-color)",

      ".signupBtn": {
        margin: "2rem 0.5rem",
        fontSize: "1.2rem",
        color: "var(--basic-font)",
        borderBottom: "1px solid var(--basic-font)",
        textAlign: "center",
      },
    },

    ".middleLine": {
      margin: "2.5rem 0",
      width: "90vw",
      display: "flex",
      justifyContent: "center",

      span: {
        fontSize: "1.2rem",
        padding: "0 1rem",
        display: "flex",
        alignItems: "center",
        color: "var(--shadow-color)",
      },

      "&::before": {
        content: "''",
        width: "100%",
        borderTop: "1px solid var(--form-color)",
        alignSelf: "center",
      },

      "&::after": {
        content: "''",
        width: "100%",
        borderTop: "1px solid var(--form-color)",
        alignSelf: "center",
      },
    },

    button: {
      ...globalBtn,
      width: "90%",

      span: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        margin: "0 1rem",
      },
    },

    ".googleBtn": {
      background: "#fff",
      border: "0.5px solid #141414",
    },

    ".kakaoBtn": {
      background: "#fee20b",
      margin: "1rem 0",
    },
  },

  "@media (min-width: 1200px)": {
    width: "40vw",
    height: "calc(100vh - 8rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    ".signinInfoContainer": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "60%",
      height: "100%",

      ".contentBox": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "60%",
        border: "3px solid var(--basic-dark)",
        borderRight: "none",
        borderRadius: "5px",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        boxSizing: "border-box",
        paddingLeft: "5rem",

        ".logo": {
          fontSize: "15rem",
        },

        h1: {
          fontSize: "6rem",
          margin: "4rem 0",
        },
      },
    },

    ".signinContainer": {
      width: "40%",
      boxShadow: "8px 8px 30px var(--box-shadow)",
      borderRadius: "5px",
      padding: "5rem 2rem",

      ".logo": {
        width: "5rem",
        height: "5rem",
        fontSize: "2.5rem",
      },

      h1: {
        fontSize: "2.5rem",
        margin: "2rem 0",
      },

      p: {
        fontSize: "1.6rem",
        marginBottom: "4rem",
      },

      form: {
        width: "80%",
      },

      ".guideSignup": {
        fontSize: "1.4rem",

        ".signupBtn": {
          fontSize: "1.4rem",
        },
      },

      ".middleLine": {
        width: "80%",

        span: {
          fontSize: "1.4rem",
        },
      },

      button: {
        width: "80%",
      },
    },
  },
};
