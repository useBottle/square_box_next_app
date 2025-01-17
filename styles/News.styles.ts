import { CSSObject, keyframes } from "@emotion/react";

export const newsListStyles: CSSObject = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  ".newsWrapper": {
    width: "100%",
    marginTop: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

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
            height: "100%",
            aspectRatio: "16 / 11",

            ".noImg": {
              width: "100%",
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
              height: "100%",
              objectFit: "cover",
            },
          },

          ".textGroup": {
            width: "100%",
            paddingLeft: "1rem",
            display: "flex",
            justifyContent: "space-between",
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
  },

  // 모바일 뷰 430px 이상
  "@media (min-width: 430px)": {
    ".newsWrapper": {
      ul: {
        width: "90%",

        a: {
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

  // 모바일 뷰 550px 이상
  "@media (min-width: 550px)": {
    ".newsWrapper": {
      ul: {
        a: {
          li: {
            ".textGroup": {
              h6: {
                fontSize: "1.8rem",
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

  // 태블릿 뷰 960px 이상 (데스크탑 뷰 모두 포함)
  "@media (min-width: 960px)": {
    marginTop: "10rem",

    ".newsWrapper": {
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
        width: "100%",

        a: {
          margin: "2rem 0",

          li: {
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
              },
            },
          },
        },
      },
    },
  },

  // 데스크탑 뷰 1200px 이상
  "@media (min-width: 1200px)": {
    ".newsWrapper": {
      ".initNews": {
        ".icon": {
          fontSize: "6rem",
        },

        ".textNback": {
          h1: {
            width: "90%",
            fontSize: "2rem",
          },

          ".backIcon": {
            fontSize: "30rem",
          },
        },
      },
    },
  },

  // 데스크탑 뷰 2000px 이상
  "@media (min-width: 2000px)": {
    ".newsWrapper": {
      ".initNews": {
        height: "90rem",

        ".icon": {
          marginBottom: "15rem",
        },

        ".textNback": {
          ".backIcon": {
            fontSize: "40rem",
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
        aspectRatio: "16 / 10",
        width: "100%",
        height: "100%",
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
        lineHeight: 1.8,
      },
    },
  },

  // 태블릿 뷰 960px 이상
  "@media (min-width: 960px)": {
    width: "100%",

    ".newsDetailWrapper": {
      width: "100%",

      ".imgGroup": {
        width: "100%",

        ".noImg": {
          marginTop: "5rem",
        },

        img: {
          marginTop: "5rem",
          width: "70%",
        },

        ".alt": {
          marginTop: "2rem",
          fontSize: "1.4rem",
          width: "70%",
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

  // 데스크탑 뷰 1200px 이상
  "@media (min-width: 1200px)": {
    ".newsDetailWrapper": {
      ".imgGroup": {
        ".newsImg": {
          marginTop: "10rem",
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
        gridTemplateColumns: "30% 70%",

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

  // 데스크탑 뷰 1200px 이상
  "@media (min-width: 1200px)": {
    form: {
      marginTop: "10rem",
    },

    ".skeleton": {
      ".list": {
        gridTemplateColumns: "30% 70%",

        ".textGroup": {
          margin: "0 2rem",
        },
      },
    },
  },

  // 데스크탑 뷰 2000px 이상
  "@media (min-width: 2000px)": {
    ".skeleton": {
      ".list": {
        gridTemplateColumns: "25% 75%",
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
