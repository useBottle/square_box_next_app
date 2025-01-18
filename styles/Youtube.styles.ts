import { CSSObject, keyframes } from "@emotion/react";

export const youtube: CSSObject = {
  ".youtubeWrapper": {
    marginTop: "3rem",
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
              marginTop: "2rem",
            },
          },
        },

        "&:hover": {
          background: "var(--list-back)",
        },
      },
    },
  },

  // 태블릿 뷰 960px 이상
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
            gridTemplateColumns: "40% 60%",
            alignItems: "center",
            padding: "1rem",

            img: {
              aspectRatio: "16 / 11",
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
            gridTemplateColumns: "40% 60%",
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
  padding: "0 1rem",

  ".youtubeDetailWrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",

    iframe: {
      width: "100vw",
      height: "100%",
      aspectRatio: "16 / 11",
    },

    ".textGroup": {
      width: "100%",
      margin: "4rem",

      ".title": {
        fontSize: "2rem",
        color: "var(--title-color)",
        marginBottom: "4rem",
      },

      ".channelContainer": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

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

        form: {
          display: "none",
        },
      },

      ".publishedAt": {
        fontSize: "1.2rem",
        color: "var(--basic-dark)",
        margin: "2rem 0",
      },

      ".description": {
        fontSize: "1.4rem",
        color: "var(--basic-font)",
        margin: "5rem 0",
      },
    },
  },

  // 태블릿 뷰 960px 이상
  "@media (min-width: 960px)": {
    padding: 0,

    ".youtubeDetailWrapper": {
      iframe: {
        width: "60vw",
      },

      ".textGroup": {
        width: "100%",

        ".title": {
          fontSize: "2.6rem",
          marginTop: "6rem",
        },

        ".channelContainer": {
          marginTop: "4rem",

          form: {
            display: "block",
          },
        },

        ".publishedAt": {
          marginTop: "4rem",
          fontSize: "1.4rem",
        },

        form: {
          display: "none",
        },

        ".description": {
          fontSize: "1.8rem",
          margin: "5rem 0",
        },
      },
    },
  },

  // 데스크탑 뷰 1200px 이상
  "@media (min-width: 1200px)": {
    ".youtubeDetailWrapper": {
      iframe: {
        width: "50vw",
      },
    },
  },

  // 데스크탑 뷰 2000px 이상
  "@media (min-width: 2000px)": {
    ".youtubeDetailWrapper": {
      iframe: {
        width: "40vw",
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
    width: "100%",
    margin: "1rem 0",

    ".list": {
      width: "90%",
      marginBottom: "10rem",
      display: "grid",
      gridTemplateRows: "70% 35%",
      alignItems: "center",

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
        height: "100%",
        aspectRatio: "16 / 11",
      },

      ".textGroup": {
        marginTop: "5rem",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",

        ".titleFrame": {
          width: "100%",
          height: "25%",
          background: "lightgray",
          marginBottom: "2rem",
        },

        ".channelFrame": {
          height: "20%",
          background: "lightgray",
          width: "20%",
        },

        ".dateFrame": {
          height: "20%",
          background: "lightgray",
          marginTop: "2rem",
          width: "30%",
        },
      },
    },
  },

  // 태블릿 뷰 960px 이상
  "@media (min-width: 960px)": {
    // SearchBar 간격
    form: {
      marginTop: "5rem",
    },

    ".skeleton": {
      width: "100%",

      ".list": {
        width: "100%",
        display: "grid",
        gridTemplateRows: "none",
        gridTemplateColumns: "35% 65%",
        alignItems: "center",
        margin: "3rem 0",

        ".textGroup": {
          width: "auto",
          height: "100%",
          margin: 0,
          paddingLeft: "2rem",

          ".titleFrame": {
            width: "100%",
            marginBottom: "1rem",
          },

          ".channelFrame": {
            margin: 0,
          },

          ".dateFrame": {
            marginTop: "1rem",
            height: "15%",
          },
        },
      },
    },
  },

  // 데스크탑 뷰 1200px 이상 (2000px 이상 포함)
  "@media (min-width: 1200px)": {
    // SearchBar 간격
    form: {
      marginTop: "10rem",
    },
  },
};
