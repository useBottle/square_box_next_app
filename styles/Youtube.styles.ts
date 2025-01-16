import { CSSObject, keyframes } from "@emotion/react";

export const youtube: CSSObject = {
  ".youtubeWrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    overflowX: "hidden",
    width: "100%",

    ".initYoutube": {
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
          fontSize: "23rem",
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

            ".description": {
              fontSize: "1.4rem",
              color: "var(--basic-font)",
              margin: "1rem 0",
            },
          },
        },

        "&:hover": {
          background: "var(--list-back)",
        },
      },
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    ".youtubeWrapper": {
      width: "100%",
      marginTop: "2rem",

      ".initYoutube": {
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
          width: "100%",
          margin: "3rem 0",

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
              padding: "0 2rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              ".title": {
                fontSize: "2rem",
                margin: 0,
              },

              ".channel": {
                marginBottom: 0,
              },

              ".description": {
                margin: 0,
              },
            },
          },
        },
      },
    },
  },

  // 데스크탑 뷰 1200px 이상
  "@media (min-width: 1200px)": {
    ".youtubeWrapper": {
      marginTop: "10rem",

      ".initYoutube": {
        height: "50rem",

        ".icon": {
          fontSize: "6rem",
          marginBottom: "10rem",
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

      ul: {
        a: {
          li: {
            gridTemplateColumns: "30% 70%",
          },
        },
      },
    },
  },

  // 데스크탑 뷰 2000px 이상
  "@media (min-width: 2000px)": {
    ".youtubeWrapper": {
      marginTop: "10rem",

      ".initYoutube": {
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
            gridTemplateColumns: "30% 70%",
          },
        },
      },
    },
  },
};

export const youtubeDynamic: CSSObject = {
  ".youtubeDetailWrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",

    ".player": {
      width: "100%",
    },

    ".textGroup": {
      padding: "1rem",

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

      ".description": {
        fontSize: "1.4rem",
        color: "var(--basic-font)",
        margin: "1rem 0",
      },
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    ".youtubeDetailWrapper": {
      width: "100%",

      iframe: {
        width: "calc(60vw - 1px)",
        height: "60vh",
      },

      ".textGroup": {
        width: "100%",

        ".title": {
          fontSize: "2.6rem",
          marginTop: "6rem",
        },

        ".channel": {
          marginTop: "4rem",
        },

        ".publishedAt": {
          marginTop: "4rem",
          fontSize: "1.4rem",
        },

        form: {
          margin: "4rem 0",
        },

        ".description": {
          fontSize: "1.8rem",
          margin: "5rem 0",
        },
      },
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    ".youtubeDetailWrapper": {
      iframe: {
        width: "calc(50vw - 1px)",
        height: "50vh",
      },
    },
  },

  "@media (min-width: 2000px)": {
    ".youtubeDetailWrapper": {
      iframe: {
        width: "calc(40vw - 1px)",
        height: "45vh",
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

export const youtubeSkeleton: CSSObject = {
  ".skeleton": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    margin: "1rem 0",

    ".list": {
      width: "90%",
      margin: "1.5rem",

      ".default": {
        position: "relative",
        overflow: "hidden",
        borderRadius: "5px",
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

      ".imgFrame": {
        width: "100%",
        height: "25rem",
      },

      ".textGroup": {
        margin: "1rem 0",
        width: "100%",

        ".titleFrame": {
          height: "3rem",
          background: "lightgray",
          margin: "2rem 0",
        },

        ".channelFrame": {
          height: "3rem",
          background: "lightgray",
          margin: "2rem 0",
          width: "20%",
        },

        ".dateFrame": {
          height: "2rem",
          background: "lightgray",
          margin: "4rem 0",
          width: "30%",
        },

        ".descGroup": {
          ".descFrame": {
            height: "2rem",
            background: "lightgray",
            margin: "1rem 0",
            width: "90%",

            "&:first-of-type": {
              width: "60%",
            },

            "&:last-of-type": {
              width: "80%",
            },
          },
        },
      },
    },
  },

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "100%",

    form: {
      marginTop: "5rem",
    },

    ".skeleton": {
      width: "100%",

      ".list": {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "35% 65%",
        alignItems: "center",
        margin: "3rem 0",
        overflow: "hidden",

        ".imgFrame": {
          height: "20rem",
        },

        ".textGroup": {
          width: "calc(100% - 2rem)",
          paddingLeft: "2rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          ".titleFrame": {
            width: "100%",
            marginTop: 0,
          },

          ".channelFrame": {
            margin: 0,
          },

          ".dateFrame": {
            margin: 0,
          },

          ".descGroup": {
            ".descFrame": {
              marginBottom: 0,

              "&:last-of-type": {
                display: "none",
              },
            },
          },
        },
      },
    },
  },

  // 데스크탑 뷰 1200px 이상 (2000px 이상 포함)
  "@media (min-width: 1200px)": {
    form: {
      marginTop: "10rem",
    },

    ".skeleton": {
      ".list": {
        gridTemplateColumns: "30% 70%",
      },
    },
  },
};
