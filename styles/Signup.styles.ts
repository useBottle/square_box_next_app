import { CSSObject, keyframes } from "@emotion/react";
import { globalBtn, infoText, infoTitle, input } from "./default.styles";

const rotate = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
});

export const signup: CSSObject = {
  ".signupWrapper": {
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

      div: {
        width: "100%",

        ".inputContainer": {
          width: "100%",
          background: "#eee",
          borderRadius: "3px",
          border: "1.5px solid transparent",
          margin: "0.6rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",

          input: {
            ...input,
            width: "90%",
            margin: 0,

            "&:focus": {
              border: "1.5px solid transparent",
            },
          },

          ".checkIcon": {
            fontSize: "1.8rem",
            color: "var(--input-check)",
            marginRight: "1rem",
          },

          "&:focus": {
            border: "1.5px solid var(--main-color)",
            transition: "ease 0.3s",
          },
        },

        ".duplicateBtn": {
          ...globalBtn,
          background: "var(--main-color)",
          color: "#fff",

          ".spinner": {
            width: "1.6rem",
            height: "1.6rem",
            border: "4px solid var(--shadow-color)",
            borderRadius: "50%",
            borderRightColor: "transparent",
            animation: `${rotate} 1s linear infinite`,
          },
        },

        p: {
          fontSize: "1.2rem",
          color: "red",
          marginBottom: "2.5rem",
          alignSelf: "flex-start",
        },
      },

      ".signupBtn": {
        ...globalBtn,
        background: "var(--main-color)",
        color: "#fff",
        marginTop: "4rem",

        ".spinner": {
          width: "1.6rem",
          height: "1.6rem",
          border: "4px solid var(--shadow-color)",
          borderRadius: "50%",
          borderRightColor: "transparent",
          animation: `${rotate} 1s linear infinite`,
        },
      },
    },

    ".guideSignin": {
      marginTop: "3rem",
      marginBottom: "5rem",
      fontSize: "1.2rem",
      color: "var(--shadow-color)",

      ".signinBtn": {
        margin: "2rem 0.5rem",
        fontSize: "1.2rem",
        color: "var(--basic-font)",
        borderBottom: "1px solid var(--basic-font)",
        textAlign: "center",
      },
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "100%",
    height: "calc(100vh - 8rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    ".signupWrapper": {
      width: "40%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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

        button: {
          lineHeight: 1,
        },
      },

      ".guideSignin": {
        fontSize: "1.4rem",

        ".signinBtn": {
          fontSize: "1.4rem",
        },
      },
    },
  },
};
