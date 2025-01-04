import { CSSObject, keyframes } from "@emotion/react";

export const youtube: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",

  "& a": {
    width: "90%",
    margin: "2rem 0",

    "& li": {
      width: "100%",
      border: "1px solid #eee",
      borderRadius: "5px",
      boxSizing: "border-box",

      "& img": {
        width: "100%",
        height: "auto",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
      },

      "& .textGroup": {
        padding: "1rem",

        "& .title": {
          fontSize: "2rem",
          color: "var(--main-color)",
          margin: "1rem 0",
        },

        "& .channel": {
          fontSize: "1.4rem",
          padding: "0.5rem 1rem",
          color: "var(--reverse-font)",
          background: "var(--basic-font)",
          border: "1px solid var(--basic-font)",
          borderRadius: "3px",
          width: "fit-content",
          margin: "2rem 0",
        },

        "& .publishedAt": {
          fontSize: "1.2rem",
          color: "var(--basic-font)",
          margin: "2rem 0",
        },

        "& .description": {
          fontSize: "1.4rem",
          color: "var(--basic-font)",
          margin: "1rem 0",
        },
      },
    },
  },
};

export const youtubeDynamic: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100vw",

  "& .player": {
    width: "100%",
  },

  "& .textGroup": {
    padding: "1rem",

    "& .title": {
      fontSize: "2rem",
      color: "var(--main-color)",
      margin: "1rem 0",
    },

    "& .channel": {
      fontSize: "1.4rem",
      padding: "0.5rem 1rem",
      color: "var(--reverse-font)",
      background: "var(--basic-font)",
      border: "1px solid var(--basic-font)",
      borderRadius: "3px",
      width: "fit-content",
      margin: "2rem 0",
    },

    "& .publishedAt": {
      fontSize: "1.2rem",
      color: "var(--basic-font)",
      margin: "2rem 0",
    },

    "& .description": {
      fontSize: "1.4rem",
      color: "var(--basic-font)",
      margin: "1rem 0",
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  margin: "1rem 0",

  "& .list": {
    width: "90%",
    margin: "1.5rem",

    "& .default": {
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

    "& .imgFrame": {
      width: "100%",
      height: "25rem",
    },

    "& .textGroup": {
      margin: "1rem 0",
      width: "100%",

      "& .titleFrame": {
        height: "3rem",
        background: "lightgray",
        margin: "2rem 0",
      },

      "& .channelFrame": {
        height: "3rem",
        background: "lightgray",
        margin: "2rem 0",
        width: "20%",
      },

      "& .dateFrame": {
        height: "2rem",
        background: "lightgray",
        margin: "4rem 0",
        width: "30%",
      },

      "& .descGroup": {
        "& .descFrame": {
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
};
