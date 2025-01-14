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
    height: "60vh",
    width: "100%",

    ".icon": {
      fontSize: "6rem",
      marginBottom: "5rem",
      transform: "translateY(-7rem)",
    },

    ".textNback": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "90%",

      h1: {
        display: "flex",
        justifyContent: "center",
        width: "70%",
        fontSize: "1.6rem",
        background: "var(--reverse-font)",
        zIndex: 10,
        transform: "translateY(0.5rem)",
        border: "1px solid var(--basic-font)",
        borderLeft: "none",
        borderRight: "none",
        padding: "1rem 0",
      },

      ".backIcon": {
        position: "absolute",
        top: "50%",
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

  "@media (min-width: 1200px)": {
    width: "40vw",
    marginTop: "10rem",

    h4: {
      width: "100%",
      fontSize: "1.4rem",
      marginBottom: "4rem",
    },

    ul: {
      a: {
        height: "18rem",

        li: {
          width: "100%",
          height: "100%",
          gridTemplateColumns: "20% 80%",

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
};

export const dynamicNewsStyles: CSSObject = {
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

  "@media (min-width: 1200px)": {
    width: "40vw",

    ".imgGroup": {
      width: "40vw",

      ".alt": {
        marginTop: "2rem",
        fontSize: "1.4rem",
      },
    },

    ".textGroup": {
      padding: 0,

      h1: {
        marginTop: "6rem",
        fontSize: "2.6rem",
      },

      ".date": {
        fontSize: "1.4rem",
        marginTop: "4rem",
      },

      form: {
        width: "100%",
        margin: "8rem 0",
      },

      p: {
        fontSize: "1.8rem",
        margin: "5rem 0",
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

  "@media (min-width: 1200px)": {
    width: "40vw",
    position: "absolute",
    left: "50%",
    top: "70%",
    transform: "translate(-50%, -50%)",

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
    borderRadius: 0,
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
};
