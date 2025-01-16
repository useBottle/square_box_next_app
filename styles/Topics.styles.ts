import { CSSObject } from "@emotion/react";

// 실시간 검색어 Top 10 UI
export const topicsForm: CSSObject = {
  width: "100%",

  ".topicsWrapper": {
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
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    width: "100%",
    marginTop: "5rem",

    ".topicsWrapper": {
      width: "100%",

      h4: {
        width: "100%",
        fontSize: "1.4rem",
        marginBottom: "2rem",
      },

      ul: {
        width: "100%",

        a: {
          margin: "0.5rem 0",

          li: {
            fontSize: "1.6rem",
          },
        },
      },
    },
  },
};
