import { CSSObject, keyframes } from "@emotion/react";

export const newsListStyles: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  "& a": {
    display: "flex",
    justifyContent: "center",

    "& li": {
      width: "90%",
      height: "10rem",
      overflow: "hidden",
      color: "var(--basic-font)",
      display: "grid",
      gridTemplateColumns: "35% 65%",
      margin: "1.5rem",
      border: "1px solid #eee",
      borderRadius: "5px",
      boxSizing: "border-box",

      "& img": {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
      },

      "& .textGroup": {
        padding: "1rem",
        height: "10rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        boxSizing: "border-box",

        "& h6": {
          fontSize: "1.4rem",
          lineHeight: 1.2,
          color: "var(--main-color)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        },

        "& .date": {
          margin: "0.5rem 0",
        },

        "& p": {
          fontSize: "1.1rem",
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        },
      },
    },

    "&:last-child": {
      marginBottom: "4rem",
    },
  },
};

export const dynamicNewsStyles: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  "& .imgGroup": {
    width: "100vw",

    "& img": {
      width: "100%",
      height: "auto",
    },

    "& .alt": {
      fontSize: "1.2rem",
      color: "var(--basic-dark)",
      marginTop: "1rem",
      marginBottom: "1rem",
      padding: "0 1rem",
    },
  },

  "& .textGroup": {
    padding: "0 1rem",
    marginBottom: "10rem",

    "& h1": {
      marginTop: "4rem",
      fontSize: "2rem",
      color: "var(--main-color)",
    },

    "& .date": {
      fontSize: "1.2rem",
      marginTop: "2rem",
      marginBottom: "4rem",
      color: "var(--basic-dark)",
    },

    "& p": {
      margin: "2rem 0",
      fontSize: "1.4rem",
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

  "& .list": {
    width: "90%",
    height: "10rem",
    display: "grid",
    gridTemplateColumns: "35% 65%",
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

    "& .textGroup": {
      margin: "1rem 0",
      marginLeft: "1rem",

      "& .textFrame": {
        width: "90%",
        height: "2rem",
        background: "lightgray",
        marginBottom: "0.5rem",

        "&:first-child": {
          width: "100%",
          height: "2.5rem",
          background: "lightgray",
          marginBottom: "1rem",
        },
      },
    },
  },
};
