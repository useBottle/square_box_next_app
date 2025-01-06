import { CSSObject, keyframes } from "@emotion/react";

export const latestNews: CSSObject = {
  marginTop: "6rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  h4: {
    width: "90%",
    fontSize: "1.2rem",
    color: "var(--basic-dark)",
    marginBottom: "1rem",
    borderBottom: "0.5px solid var(--form-color)",
    padding: "1rem 0",
  },

  ul: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    a: {
      width: "100%",
      display: "flex",
      justifyContent: "center",

      li: {
        width: "100%",
        height: "10rem",
        color: "var(--basic-font)",
        display: "grid",
        gridTemplateColumns: "35% 65%",
        margin: "1.5rem 0",
        border: "1px solid #eee",
        borderRadius: "5px",
        boxSizing: "border-box",
        overflow: "hidden",

        img: {
          width: "100%",
          height: "100%",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
        },

        ".textGroup": {
          height: "10rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          boxSizing: "border-box",

          h6: {
            fontSize: "1.4rem",
            lineHeight: "1.2",
            color: "var(--main-color)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: "vertical",
          },

          p: {
            fontSize: "1.1rem",
            lineHeight: "1.2",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: "vertical",
          },
        },
      },

      "&:last-child": {
        marginBottom: "10rem",
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

// 최신 뉴스 Top 10 의 Skeleton UI
export const latestNewsSkeleton: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",

  ".contentBox": {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "30% 70%",
    margin: "1rem 0",

    ".default": {
      position: "relative",
      overflow: "hidden",
      background: "lightgray",
      borderRadius: "3px",
      height: "2rem",

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
      width: "10rem",
      height: "10rem",
    },

    ".textGroup": {
      marginLeft: "1rem",

      ".title": {
        height: "2.5rem",
        marginBottom: "1.5rem",
      },

      ".text1": {
        width: "80%",
        marginBottom: "0.5rem",
      },

      ".text2": {
        width: "85%",
      },
    },

    "&:last-child": {
      marginBottom: "4rem",
    },
  },
};
