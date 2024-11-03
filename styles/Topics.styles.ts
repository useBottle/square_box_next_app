import { CSSObject, keyframes } from "@emotion/react";

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

// Topics 의 Skeleton UI 애니메이션
const shine = keyframes({
  from: {
    transform: "skew(45deg) translateX(0%)",
  },
  to: {
    transform: "skew(45deg) translateX(200%)",
  },
});

// Topics 의 Skeleton UI
export const skeleton: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "90%",

  "& .list": {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "8% 84% 6%",
    margin: "1rem 0",

    "& span": {
      position: "relative",
      background: "lightgray",
      height: "1.8rem",
      borderRadius: "3px",
      overflow: "hidden",

      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#ffffff33",
        animation: `${shine} infinite 1.5s ease-in-out`,
      },
    },

    "& .rank": {
      marginLeft: "0.5rem",
    },

    "& .keyword": {
      marginLeft: "2rem",
      marginRight: "2rem",
    },
  },
};
