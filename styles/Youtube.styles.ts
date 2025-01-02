import { CSSObject } from "@emotion/react";

export const youtube: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",

  "& a": {
    width: "90%",
    margin: "2rem 0",

    "& li": {
      width: "100%",
      border: "1px solid #eee",
      borderRadius: "5px",
      boxSizing: "border-box",

      "& img": {
        width: "100%",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
      },

      "& .textGroup": {
        padding: "1rem",

        "& .title": {
          fontSize: "2rem",
          color: "var(--basic-font)",
          margin: "1rem 0",
        },

        "& .channel": {
          fontSize: "1.4rem",
          padding: "0.5rem 1rem",
          color: "var(--reverse-font)",
          background: "var(--basic-font)",
          border: "1px solid var(--basic-font)",
          borderRadius: "3px",
          width: "fit-content",
          margin: "2rem 0",
        },

        "& .publishedAt": {
          fontSize: "1.2rem",
          color: "var(--basic-font)",
          margin: "2rem 0",
        },

        "& .description": {
          fontSize: "1.4rem",
          color: "var(--basic-font)",
          margin: "1rem 0",
        },
      },
    },
  },
};
