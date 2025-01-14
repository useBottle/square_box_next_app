import { CSSObject, keyframes } from "@emotion/react";

// 실시간 검색어 Top 10 UI
export const topicsForm: CSSObject = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",

  h4: {
    width: "90%",
    fontSize: "1.2rem",
    color: "var(--basic-dark)",
    marginTop: "5rem",
    marginBottom: "1rem",
    borderBottom: "0.5px solid var(--form-color)",
    padding: "1rem 0",
  },

  ul: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: "1rem 0",

    a: {
      width: "100%",
      textDecoration: "none",
      color: "var(--basic-font)",

      li: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "15% 75% 10%",
        padding: "1.2rem 0",
        fontSize: "1.4rem",
        cursor: "pointer",

        ".rank": {
          marginLeft: "1rem",
        },

        ".state": {
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "1rem",

          ".new": {
            color: "var(--state-new)",
          },

          ".up": {
            color: "var(--state-up)",
          },

          ".down": {
            color: "var(--state-down)",
          },
        },
      },
    },
  },

  "@media (min-width: 1200px)": {
    maxWidth: "60vw",
  },
};

// Skeleton UI 애니메이션
const shine = keyframes({
  from: {
    transform: "skew(45deg) translateX(0%)",
  },
  to: {
    transform: "skew(45deg) translateX(200%)",
  },
});

// 실시간 검색어 Top 10 의 Skeleton UI
export const topicsSkeleton: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "90%",
  margin: "1rem 0",

  ".list": {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "8% 84% 6%",
    margin: "1rem 0",

    span: {
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

    ".rank": {
      marginLeft: "0.5rem",
    },

    ".keyword": {
      marginLeft: "2rem",
      marginRight: "2rem",
    },
  },
};
