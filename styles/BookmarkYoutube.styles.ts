import { CSSObject } from "@emotion/react";

export const bookmarkYoutube: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",

  ".youtubeContainer": {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10rem",

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",

        ".youtubeLink": {
          width: "90%",
          margin: "2rem 0",

          li: {
            width: "100%",

            img: {
              width: "100%",
              height: "auto",
            },

            ".textGroup": {
              padding: "1rem 0",

              ".title": {
                fontSize: "2rem",
                color: "var(--title-color)",
                margin: "1rem 0",
              },

              ".channel": {
                fontSize: "1.4rem",
                padding: "0.5rem 1rem",
                color: "var(--reverse-font)",
                background: "var(--basic-font)",
                border: "1px solid var(--basic-font)",
                borderRadius: "3px",
                width: "fit-content",
                margin: "2rem 0",
              },

              ".publishedAt": {
                fontSize: "1.2rem",
                color: "var(--basic-dark)",
                margin: "2rem 0",
              },
            },
          },

          "&:hover": {
            background: "var(--list-back)",
          },
        },

        ".noHover": {
          "&:hover": {
            background: "none",
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
  },

  // 태블릿 뷰 960px 이상
  "@media (min-width: 960px)": {
    ".youtubeContainer": {
      width: "100%",
      marginTop: "5rem",

      h4: {
        fontSize: "1.4rem",
      },

      ".contents": {
        marginTop: "5rem",
        width: "100%",

        ul: {
          ".youtubeLink": {
            width: "100%",

            li: {
              display: "grid",
              gridTemplateColumns: "35% 65%",
              alignItems: "center",
              padding: "1rem",

              img: {
                width: "100%",
                height: "100%",
              },

              ".textGroup": {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                marginLeft: "1rem",

                ".title": {
                  fontSize: "2rem",
                  margin: 0,
                },

                ".channel": {
                  marginBottom: 0,
                },

                ".publishedAt": {
                  margin: 0,
                },
              },

              "&:hover": {
                background: "var(--list-back)",
              },
            },
          },
        },
      },
    },
  },

  // 데스크탑 뷰 1200px 이상 (2000px 이상 포함)
  "@media (min-width: 1200px)": {
    ".youtubeContainer": {
      ".contents": {
        ul: {
          ".youtubeLink": {
            li: {
              gridTemplateColumns: "30% 70%",
            },
          },
        },
      },
    },
  },
};
