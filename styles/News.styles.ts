import { CSSObject, keyframes } from "@emotion/react";

export const newsListStyles: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  overflowX: "hidden",
  width: "100%",

  ".initNews": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "45rem",
    width: "100%",

    ".icon": {
      fontSize: "6rem",
      marginBottom: "7rem",
    },

    ".textNback": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "60%",

      h1: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        fontSize: "1.6rem",
        background: "var(--reverse-font)",
        zIndex: 10,
        border: "1px solid var(--basic-font)",
        borderLeft: "none",
        borderRight: "none",
        padding: "1rem 0",
      },

      ".backIcon": {
        fontSize: "20rem",
        opacity: 0.1,
      },
    },
  },

  ul: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",

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

        ".noImg": {
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "var(--background)",
          color: "var(--basic-font)",
          fontSize: "1.4rem",
        },

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
        marginBottom: "4rem",
      },

      "&:hover": {
        background: "var(--list-back)",
      },
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "100%",
    marginTop: "2rem",

    ".newsWrapper": {
      width: "100%",

      ".initNews": {
        height: "50rem",

        ".icon": {
          fontSize: "5rem",
          marginBottom: "10rem",
        },

        ".textNback": {
          width: "50%",

          h1: {
            fontSize: "1.8rem",
            padding: "1.5rem 0",
          },

          ".backIcon": {
            fontSize: "20rem",
          },
        },
      },

      ul: {
        a: {
          height: "18rem",
          margin: "3rem 0",

          li: {
            width: "100%",
            height: "100%",
            gridTemplateColumns: "30% 70%",

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

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    marginTop: "10rem",

    ".newsWrapper": {
      ".initNews": {
        height: "90rem",

        ".icon": {
          fontSize: "6rem",
          marginBottom: "15rem",
        },

        ".textNback": {
          h1: {
            fontSize: "2rem",
          },

          ".backIcon": {
            fontSize: "40rem",
          },
        },
      },

      ul: {
        a: {
          li: {
            gridTemplateColumns: "20% 80%",
          },
        },
      },
    },
  },
};

export const dynamicNewsStyles: CSSObject = {
  ".newsDetailWrapper": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    ".imgGroup": {
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",

      img: {
        width: "100%",
        height: "auto",
      },

      ".noImg": {
        width: "90%",
        height: "30vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--reverse-font)",
        border: "1px dashed var(--basic-font)",
        color: "var(--basic-font)",
        fontSize: "2rem",
      },

      ".alt": {
        fontSize: "1.2rem",
        color: "var(--basic-dark)",
        marginTop: "1rem",
        marginBottom: "1rem",
        padding: "0 1rem",
      },
    },

    ".textGroup": {
      padding: "0 1rem",
      marginBottom: "10rem",

      h1: {
        marginTop: "4rem",
        fontSize: "2rem",
        color: "var(--title-color)",
      },

      ".date": {
        fontSize: "1.2rem",
        marginTop: "2rem",
        marginBottom: "4rem",
        color: "var(--basic-dark)",
      },

      p: {
        margin: "2rem 0",
        fontSize: "1.4rem",
        whiteSpace: "pre-line",
      },
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "100%",

    ".newsDetailWrapper": {
      width: "100%",

      ".imgGroup": {
        width: "100%",

        ".noImg": {
          marginTop: "5rem",
        },

        ".newsImg": {
          marginTop: "5rem",
          width: "auto",
        },

        ".latestNewsImg": {
          marginTop: "10rem",
          width: "90%",
        },

        ".alt": {
          marginTop: "2rem",
          fontSize: "1.4rem",
          width: "90%",
        },
      },

      ".textGroup": {
        marginTop: "5rem",
        marginBottom: "20rem",
        padding: 0,

        h1: {
          fontSize: "2.6rem",
        },

        ".date": {
          fontSize: "1.4rem",
          marginTop: "4rem",
        },

        form: {
          width: "100%",
          margin: "5rem 0",
        },

        p: {
          fontSize: "1.8rem",
          margin: "5rem 0",
        },
      },
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    ".newsDetailWrapper": {
      ".imgGroup": {
        ".newsImg": {
          marginTop: "10rem",
        },

        ".alt": {
          width: "60%",
        },
      },

      ".textGroup": {
        marginTop: "10rem",
      },
    },
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

export const newsSkeleton: CSSObject = {
  ".skeleton": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    margin: "1rem 0",

    ".list": {
      width: "90%",
      height: "10rem",
      display: "grid",
      gridTemplateColumns: "35% 65%",
      margin: "1.5rem",

      ".default": {
        position: "relative",
        overflow: "hidden",
        background: "lightgray",
        borderRadius: "3px",

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

      ".textGroup": {
        margin: "1rem 0",
        marginLeft: "1rem",

        ".textFrame": {
          width: "90%",
          height: "2rem",
          background: "lightgray",
          marginBottom: "0.5rem",

          "&:first-of-type": {
            width: "100%",
            height: "2.5rem",
            background: "lightgray",
            marginBottom: "1rem",
          },
        },
      },
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "100%",

    form: {
      marginTop: "2rem",
    },

    ".skeleton": {
      width: "100%",

      ".list": {
        width: "100%",
        height: "18rem",
        gridTemplateColumns: "20% 80%",

        ".textGroup": {
          marginLeft: "2rem",

          ".textFrame": {
            height: "3rem",
            marginBottom: "1rem",

            "&:first-of-type": {
              height: "3.5rem",
              marginBottom: "2rem",
            },
          },
        },
      },
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    width: "100%",

    form: {
      marginTop: "10rem",
    },

    ".skeleton": {
      width: "100%",

      ".list": {
        width: "100%",
        height: "18rem",
        gridTemplateColumns: "20% 80%",

        ".textGroup": {
          margin: "0 2rem",

          ".textFrame": {
            height: "3rem",
            marginBottom: "1rem",

            "&:first-of-type": {
              height: "3.5rem",
              marginBottom: "2rem",
            },
          },
        },
      },
    },
  },
};

export const articleSkeleton: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100vw",

  ".default": {
    position: "relative",
    overflow: "hidden",
    borderRadius: "3px",
    background: "lightgray",

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

  ".img": {
    width: "100%",
    height: "30rem",
  },

  ".title": {
    width: "95%",
    height: "3rem",
    margin: "5rem 0",
  },

  ".textGroup": {
    width: "95%",

    ".text": {
      width: "95%",
      height: "2rem",
      marginBottom: "1.5rem",
    },

    "& .text:nth-of-type(2)": {
      width: "80%",
    },

    "& .text:nth-of-type(3)": {
      width: "90%",
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "100%",
    marginBottom: "10rem",

    ".img": {
      marginTop: "10rem",
      height: "40rem",
      width: "70%",
    },

    ".title": {
      width: "100%",
      height: "5rem",
      margin: "10rem 0",
    },

    ".textGroup": {
      width: "100%",

      ".text": {
        width: "100%",
        height: "3rem",
        marginBottom: "2rem",
      },
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    marginBottom: 0,
  },
};
