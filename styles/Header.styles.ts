import { CSSObject } from "@emotion/react";

export const header: CSSObject = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "5rem",
  zIndex: 999,

  "& .logo": {
    display: "flex",
    color: "var(--basic-font)",
    fontSize: "2rem",
    margin: "1rem 1.5rem",
  },

  "& .menuBtn": {
    fontSize: "2rem",
    margin: "0 1.5rem",
  },
};
