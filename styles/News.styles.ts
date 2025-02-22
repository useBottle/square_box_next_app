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

      ".noHover": {
        "&:hover": {
          background: "none",
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

  // 태블릿 뷰 550px 이상
  "@media (min-width: 550px)": {
    ".newsWrapper": {
      ul: {
        a: {
          li: {
            ".textGroup": {
              paddingLeft: "2rem",

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

  // 태블릿 뷰 700px 이상
  "@media (min-width: 700px)": {
    ".newsWrapper": {
      ul: {
        a: {
          li: {
            gridTemplateColumns: "30% 70%",
          },
        },
      },
    },
  },

  // 태블릿 뷰 800px 이상
  "@media (min-width: 800px)": {
    ".newsWrapper": {
      ul: {
        a: {
          li: {
            gridTemplateColumns: "25% 75%",
          },
        },
      },
    },
  },

  // 태블릿 뷰 960px 이상
  "@media (min-width: 960px)": {
    ".newsWrapper": {
      marginTop: "2rem",

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
            gridTemplateColumns: "30% 70%",

            ".textGroup": {
              h6: {
                fontSize: "1.8rem",
                lineHeight: 1.5,
              },

              ".date": {
                fontSize: "1.2rem",
              },

              p: {
                fontSize: "1.2rem",
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

      ul: {
        a: {
          li: {
            ".textGroup": {
              p: {
                fontSize: "1.4rem",
              },
            },
          },
        },
      },
    },
  },

  // 데스크탑 뷰 1500px 이상
  "@media (min-width: 1500px)": {
    ".newsWrapper": {
      ul: {
        a: {
          li: {
            gridTemplateColumns: "25% 75%",

            ".textGroup": {
              h6: {
                fontSize: "2rem",
              },
            },
          },
        },
      },
    },
  },

  // 데스크탑 뷰 1750px 이상
  "@media (min-width: 1750px)": {
    ".newsWrapper": {
      ul: {
        a: {
          li: {
            gridTemplateColumns: "20% 80%",
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
      width: "95%",
      marginBottom: "10rem",

      h1: {
        marginTop: "4rem",
        fontSize: "2rem",
        color: "var(--title-color)",
      },

      ".container": {
        marginTop: "2rem",
        marginBottom: "5rem",

        ".date": {
          fontSize: "1.2rem",
          marginBottom: "4rem",
          color: "var(--basic-dark)",
        },
      },

      p: {
        margin: "2rem 0",
        fontSize: "1.4rem",
        whiteSpace: "pre-line",
        lineHeight: 1.8,
      },
    },
  },

  // 태블릿 뷰 600px 이상
  "@media (min-width: 600px)": {
    ".newsDetailWrapper": {
      ".imgGroup": {
        width: "70%",
      },
    },
  },

  // 태블릿 뷰 800px 이상
  "@media (min-width: 800px)": {
    ".newsDetailWrapper": {
      ".imgGroup": {
        width: "60%",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
      },

      ".textGroup": {
        marginTop: "5rem",
        marginBottom: "20rem",
        width: "100%",

        h1: {
          fontSize: "2.6rem",
        },

        ".container": {
          marginTop: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          ".date": {
            margin: 0,
            fontSize: "1.4rem",
            width: "30%",
          },
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
  width: "100%",

  form: {
    marginTop: "3rem",
  },

  ".skeleton": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "1rem 0",

    ".list": {
      width: "90%",
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

      ".imgFrame": {
        aspectRatio: "16 / 11",
      },

      ".textGroup": {
        marginLeft: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",

        ".titleFrame": {
          width: "100%",
          height: "25%",
          background: "lightgray",
        },

        ".pharagraphFrame": {
          width: "100%",
          display: "flex",
          height: "50%",
          flexDirection: "column",
          justifyContent: "space-between",

          ".textFrame": {
            width: "80%",
            height: "80%",
            background: "lightgray",

            "&:last-of-type": {
              marginTop: "1rem",
              width: "90%",
            },
          },
        },
      },
    },
  },

  // 태블릿 뷰 700px 이상
  "@media (min-width: 700px)": {
    ".skeleton": {
      ".list": {
        gridTemplateColumns: "30% 70%",
      },
    },
  },

  // 태블릿 뷰 800px 이상
  "@media (min-width: 800px)": {
    ".skeleton": {
      ".list": {
        gridTemplateColumns: "25% 75%",
      },
    },
  },

  // 태블릿 뷰 960px 이상
  "@media (min-width: 960px)": {
    // SearchBar 간격
    form: {
      marginTop: "2rem",
    },

    ".skeleton": {
      ".list": {
        width: "100%",
        gridTemplateColumns: "30% 70%",

        ".textGroup": {
          marginLeft: "2rem",
        },
      },
    },
  },

  // 데스크탑 뷰 1200px 이상
  "@media (min-width: 1200px)": {
    // SearchBar 간격
    form: {
      marginTop: "2rem",
    },
  },

  // 데스크탑 뷰 1500px 이상
  "@media (min-width: 1500px)": {
    ".skeleton": {
      ".list": {
        gridTemplateColumns: "25% 75%",
      },
    },
  },

  // 데스크탑 뷰 1750px 이상
  "@media (min-width: 1750px)": {
    ".skeleton": {
      ".list": {
        gridTemplateColumns: "20% 80%",
      },
    },
  },
};

export const articleSkeleton: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
    aspectRatio: "16 / 11",
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
