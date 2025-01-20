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

    ".bookmarkSub": {
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

        ".listWrapper": {
          width: "100%",

          ".youtubeLink": {
            width: "100%",

            li: {
              width: "100%",

              img: {
                width: "100%",
                height: "100%",
                aspectRatio: "16 / 11",
              },

              ".textGroup": {
                padding: "1rem 0",

                ".title": {
                  fontSize: "2rem",
                  color: "var(--title-color)",
                  margin: "1rem 0",
                },

                ".channel": {
                  fontSize: "1.2rem",
                  padding: "0.5rem 1rem",
                  color: "var(--reverse-font)",
                  background: "var(--basic-font)",
                  borderRadius: "3px",
                  width: "fit-content",
                  margin: "2rem 0",
                },

                ".container": {
                  ".publishedAt": {
                    fontSize: "1.2rem",
                    color: "var(--basic-dark)",
                  },

                  ".deleteBtn": {
                    display: "none",
                  },
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

  // 모바일 뷰 430px 이상
  "@media (min-width: 430px)": {
    ".youtubeContainer": {
      width: "90%",

      ".contents": {
        width: "100%",

        ul: {
          ".listWrapper": {
            ".youtubeLink": {
              li: {
                display: "grid",
                gridTemplateColumns: "40% 60%",
                alignItems: "center",
                marginBottom: "5rem",

                ".textGroup": {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  marginLeft: "1rem",
                  padding: 0,

                  ".title": {
                    fontSize: "1.6rem",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    lineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  },

                  ".channel": {
                    margin: 0,
                    padding: "0.2rem 0.5rem",
                    fontSize: "1rem",
                  },

                  ".container": {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    margin: 0,

                    ".publishedAt": {
                      margin: 0,
                    },

                    ".deleteBtn": {
                      display: "block",
                      margin: 0,

                      div: {
                        margin: 0,
                      },
                    },
                  },
                },

                "&:hover": {
                  background: "var(--list-back)",
                },
              },
            },

            ".mobileDeleteBtn": {
              display: "none",
            },
          },
        },
      },
    },
  },

  // 태블릿 뷰 550px 이상
  "@media (min-width: 550px)": {
    ".youtubeContainer": {
      ".contents": {
        marginTop: "5rem",

        ul: {
          ".listWrapper": {
            ".youtubeLink": {
              li: {
                ".textGroup": {
                  ".channel": {
                    padding: "0.5rem 1rem",
                    fontSize: "1.2rem",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  // 태블릿 뷰 700px 이상
  "@media (min-width: 700px)": {
    ".youtubeContainer": {
      ".contents": {
        ul: {
          ".listWrapper": {
            ".youtubeLink": {
              li: {
                ".textGroup": {
                  ".title": {
                    fontSize: "1.8rem",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  // 태블릿 뷰 960px 이상
  "@media (min-width: 960px)": {
    ".youtubeContainer": {
      width: "100%",

      ".contents": {
        marginTop: "5rem",
        width: "100%",

        ul: {
          ".listWrapper": {
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
  },

  // 데스크탑 뷰 1200px 이상 (2000px 이상 포함)
  "@media (min-width: 1200px)": {
    ".youtubeContainer": {
      ".contents": {
        ul: {
          ".listWrapper": {
            ".youtubeLink": {
              li: {
                gridTemplateColumns: "30% 70%",
              },
            },
          },
        },
      },
    },
  },
};
