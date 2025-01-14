import { CSSObject, keyframes } from "@emotion/react";

export const latestNews: CSSObject = {
  marginTop: "6rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  h4: {
    width: "90%",
    fontSize: "1.2rem",
    color: "var(--basic-dark)",
    marginBottom: "1rem",
    borderBottom: "0.5px solid var(--form-color)",
    padding: "1rem 0",
  },

  ul: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    a: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      height: "12rem",
      margin: "1.5rem 0",

      li: {
        width: "95%",
        height: "100%",
        color: "var(--basic-font)",
        display: "grid",
        gridTemplateColumns: "35% 65%",
        padding: "1rem",
        boxSizing: "border-box",
        overflow: "hidden",

        img: {
          width: "100%",
          height: "10rem",
        },

        ".textGroup": {
          width: "100%",
          justifyContent: "space-between",
          height: "100%",
          padding: "0 1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          boxSizing: "border-box",

          h6: {
            fontSize: "1.4rem",
            fontWeight: 500,
            lineHeight: 1.5,
            color: "var(--title-color)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: "vertical",
          },

          ".date": {
            color: "var(--basic-dark)",
          },

          p: {
            display: "none",
          },
        },
      },

      "&:last-child": {
        marginBottom: "10rem",
      },

      "&:hover": {
        background: "var(--list-back)",
      },
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    marginTop: "10rem",

    h4: {
      width: "100%",
      fontSize: "1.4rem",
      marginBottom: "4rem",
    },

    ul: {
      a: {
        height: "18rem",

        li: {
          width: "100%",
          height: "100%",
          gridTemplateColumns: "20% 80%",

          img: {
            height: "16rem",
          },

          ".textGroup": {
            justifyContent: "space-between",
            height: "100%",
            marginLeft: "1rem",

            h6: {
              fontSize: "2rem",
              lineHeight: 1.5,
            },

            ".date": {
              fontSize: "1.2rem",
            },

            p: {
              fontSize: "1.4rem",
              lineHeight: "1.5",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              lineClamp: 2,
              WebkitBoxOrient: "vertical",
            },
          },
        },
      },
    },
  },
};
