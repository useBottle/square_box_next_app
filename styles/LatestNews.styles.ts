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

      li: {
        width: "95%",
        height: "12rem",
        color: "var(--basic-font)",
        display: "grid",
        gridTemplateColumns: "35% 65%",
        margin: "1.5rem 0",
        background: "var(--list-back)",
        padding: "1rem",
        borderRadius: "5px",
        boxSizing: "border-box",
        overflow: "hidden",

        img: {
          width: "100%",
          height: "10rem",
          borderRadius: "5px",
        },

        ".textGroup": {
          justifyContent: "space-between",
          height: "100%",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          boxSizing: "border-box",

          h6: {
            fontSize: "1.4rem",
            fontWeight: 500,
            lineHeight: 1.2,
            color: "var(--main-color)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: "vertical",
          },

          p: {
            display: "none",
          },
        },
      },

      "&:last-child": {
        marginBottom: "10rem",
      },
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    marginTop: "10rem",

    h4: {
      fontSize: "1.4rem",
      marginBottom: "4rem",
    },

    ul: {
      a: {
        li: {
          height: "18rem",

          img: {
            height: "16rem",
          },

          ".textGroup": {
            justifyContent: "space-between",
            height: "100%",
            marginLeft: "1rem",

            h6: {
              fontSize: "1.6rem",
              lineHeight: 1.5,
            },

            ".date": {
              margin: "1rem 0",
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
