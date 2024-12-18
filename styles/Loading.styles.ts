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

  "& h1": {
    fontSize: "2rem",
    padding: "1rem",
    border: "2px solid var(--basic-font)",
    borderRadius: "5px",
    animation: `${blink} infinite 3s ease-in-out`,
  },
};
