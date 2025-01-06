import { CSSObject } from "@emotion/react";
import { modalTitle } from "./default.styles";

export const modal: CSSObject = {
  position: "absolute",
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(10px)",
  zIndex: 9999,

  ".signoutModalBox": {
    background: "var(--background)",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -70%)",
    width: "80vw",
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    h1: {
      ...modalTitle,
      transform: "translateY(-50%)",
    },

    ".btnGroup": {
      position: "absolute",
      bottom: 0,
      width: "100%",

      button: {
        background: "#eee",
        width: "50%",
        height: "5rem",
        border: "none",
        color: "var(--basic-font)",
      },

      ".signout": {
        background: "var(--main-color)",
        color: "var(--reverse-font)",
      },
    },
  },
};
