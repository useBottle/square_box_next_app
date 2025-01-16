import { CSSObject } from "@emotion/react";

export const bookmarkNews: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",

  ".newsContainer": {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    h4: {
      width: "100%",
      fontSize: "1.2rem",
      color: "var(--basic-dark)",
      marginTop: "3rem",
      marginBottom: "5rem",
      borderBottom: "0.5px solid var(--form-color)",
      padding: "1rem 0",
      display: "flex",
      justifyContent: "space-between",
    },

    ".contents": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      ul: {
        ".newsLink": {
          li: {
            width: "100%",
            height: "10rem",
            overflow: "hidden",
            color: "var(--basic-font)",
            display: "grid",
            gridTemplateColumns: "35% 65%",
            marginBottom: "1.5rem",
            boxSizing: "border-box",

            img: {
              width: "100%",
              height: "100%",
            },

            ".textGroup": {
              padding: "0 1rem",
              height: "10rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
              boxSizing: "border-box",

              h6: {
                fontSize: "1.4rem",
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
                margin: "0.5rem 0",
              },

              p: {
                display: "none",
              },
            },

            "&:hover": {
              background: "var(--list-back)",
            },
          },

          "&:last-child": {
            marginBottom: "4rem",
          },
        },
      },
    },

    ".emptyContents": {
      width: "100%",
      height: "30vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

      p: {
        fontSize: "1.4rem",
      },
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    width: "100%",

    ".newsContainer": {
      width: "100%",
      marginTop: "5rem",

      h4: {
        fontSize: "1.4rem",
      },

      ".contents": {
        marginTop: "5rem",
        width: "100%",

        ul: {
          width: "100%",

          ".newsLink": {
            li: {
              width: "100%",
              height: "18rem",
              gridTemplateColumns: "20% 80%",
              padding: "1rem",

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
    },
  },
};
