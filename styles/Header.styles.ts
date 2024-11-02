import { CSSObject } from "@emotion/react";

export const header: CSSObject = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "5rem",
  zIndex: 999,
  padding: "0 5%",

  "& .logo": {
    display: "flex",
    color: "var(--basic-font)",
    fontSize: "2rem",
  },

  "& .menuBtn": {
    fontSize: "2rem",
    color: "var(--basic-font)",
    cursor: "pointer",
  },
};
