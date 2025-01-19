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
        div: {
          ".newsLink": {
            li: {
              width: "100%",
              overflow: "hidden",
              color: "var(--basic-font)",
              display: "grid",
              gridTemplateColumns: "35% 65%",
              marginBottom: "1.5rem",
              boxSizing: "border-box",

              img: {
                width: "100%",
                height: "100%",
                aspectRatio: "16 / 11",
                objectFit: "cover",
              },

              ".textGroup": {
                padding: "0 1rem",
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

                ".container": {
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

          "&:hover": {
            background: "var(--list-back)",
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

  // 모바일 뷰 430px 이상
  "@media (min-width: 430px)": {
    ".newsContainer": {
      ".contents": {
        ul: {
          div: {
            ".newsLink": {
              li: {
                padding: 0,

                ".textGroup": {
                  h6: {
                    fontSize: "1.6rem",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  // 모바일 뷰 550px 이상
  "@media (min-width: 550px)": {
    ".newsContainer": {
      ".contents": {
        ul: {
          div: {
            ".newsLink": {
              li: {
                ".textGroup": {
                  paddingLeft: "2rem",

                  h6: {
                    fontSize: "1.8rem",
                  },

                  ".date": {
                    display: "block",
                  },

                  ".container": {
                    display: "flex",

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

                    div: {
                      display: "none",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  // 태블릿 뷰 960px 이상 (데스크탑 뷰 1200px 이상 모두 포함)
  "@media (min-width: 960px)": {
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

          div: {
            ".newsLink": {
              li: {
                width: "100%",
                gridTemplateColumns: "35% 65%",
                padding: "1rem",
                marginBottom: "3rem",

                ".textGroup": {
                  justifyContent: "space-between",
                  marginLeft: "1rem",

                  h6: {
                    fontSize: "2rem",
                    lineHeight: 1.5,
                  },

                  ".date": {
                    fontSize: "1.2rem",
                  },

                  ".container": {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",

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

                    div: {
                      display: "flex",
                      margin: 0,
                    },
                  },
                },
              },
            },

            div: {
              display: "none",
            },
          },
        },
      },
    },
  },
};
