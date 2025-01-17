import { CSSObject, keyframes } from "@emotion/react";

export const latestNews: CSSObject = {
  width: "100%",

  ".latestNewsWrapper": {
    width: "100%",
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
        margin: "1rem 0",

        li: {
          width: "100%",
          height: "100%",
          color: "var(--basic-font)",
          display: "grid",
          gridTemplateColumns: "35% 65%",
          padding: "1rem",
          margin: "1rem",
          boxSizing: "border-box",

          ".imgContainer": {
            width: "100%",
            height: "9rem",
            aspectRatio: "16 / 11",
            background: "red",

            img: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          },

          ".textGroup": {
            width: "100%",
            paddingLeft: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
  },

  // 태블릿 뷰 960px 이상 (데스크탑 뷰 모두 포함)
  "@media (min-width: 960px)": {
    marginTop: "10rem",
    width: "100%",

    ".latestNewsWrapper": {
      width: "100%",

      h4: {
        width: "100%",
        fontSize: "1.4rem",
        marginBottom: "4rem",
      },

      ul: {
        a: {
          height: "18rem",
          margin: "2rem 0",

          li: {
            width: "100%",
            height: "100%",
            margin: 0,

            ".imgContainer": {
              height: "16rem",
            },

            ".textGroup": {
              paddingLeft: "2rem",

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
  },
};
