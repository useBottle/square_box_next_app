import { CSSObject } from "@emotion/react";

export const header: CSSObject = {
  position: "fixed",
  width: "100vw",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "5rem",
  zIndex: 999,
  padding: "0 2.5rem",
  background: "var(--reverse-font)",

  ".logo": {
    display: "flex",
    alignItems: "center",
    color: "var(--basic-font)",
    fontSize: "2rem",
  },

  ".menuBtn": {
    fontSize: "2rem",
    color: "var(--basic-font)",
    cursor: "pointer",
  },

  "@media (min-width: 1200px)": {
    maxWidth: "60vw",
    padding: "0 9.5rem",
  },
};
