import { CSSObject } from "@emotion/react";

export const topicsForm: CSSObject = {
  display: "flex",
  justifyContent: "center",

  "& ul": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",

    "& li": {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "15% 75% 10%",
      padding: "1.2rem 0",
      fontSize: "1.4rem",
      cursor: "pointer",

      "& .rank": {
        marginLeft: "1rem",
      },

      "& .keyword": {},

      "& .state": {
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "1rem",

        "& .new": {
          color: "var(--state-new)",
        },

        "& .up": {
          color: "var(--state-up)",
        },

        "& .down": {
          color: "var(--state-down)",
        },
      },
    },
  },
};
