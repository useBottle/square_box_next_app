import { CSSObject, keyframes } from "@emotion/react";

const blink = keyframes({
  "0%": { borderColor: "transparent" },
  "50%": { borderColor: "var(--basic-font)" },
  "100%": { borderColor: "transparent" },
});

export const loading: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80vh",

  ".textBox": {
    padding: "2rem 6rem",
    background: "#fff",
    zIndex: 999,

    h1: {
      fontSize: "1.6rem",
      border: "1px solid var(--basic-font)",
      animation: `${blink} infinite 2s ease-in-out`,
      background: "#fff",
      padding: "1rem 5rem",
    },
  },

  ".square": {
    position: "absolute",
    width: "8rem",
    height: "20rem",
    border: "2px solid var(--square)",
  },
};
