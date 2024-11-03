import { CSSObject, keyframes } from "@emotion/react";

export const topicsForm: CSSObject = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",

  "& h4": {
    width: "90%",
    fontSize: "1.2rem",
    color: "var(--basic-dark)",
    marginTop: "2rem",
  },

  "& ul": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    margin: "1rem 0",

    "& li": {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "15% 75% 10%",
      padding: "1.2rem 0",
      fontSize: "1.4rem",
      cursor: "pointer",

      "& .rank": {
        marginLeft: "1rem",
      },

      "& .state": {
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "1rem",

        "& .new": {
          color: "var(--state-new)",
        },

        "& .up": {
          color: "var(--state-up)",
        },

        "& .down": {
          color: "var(--state-down)",
        },
      },
    },

    "&::before": {
      content: "''",
      width: "100%",
      borderTop: "0.5px solid var(--form-color)",
      marginBottom: "2rem",
    },
  },
};

// Topics 의 Skeleton UI 애니메이션
const shine = keyframes({
  from: {
    transform: "skew(45deg) translateX(0%)",
  },
  to: {
    transform: "skew(45deg) translateX(200%)",
  },
});

// Topics 의 Skeleton UI
export const skeleton: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "90%",
  margin: "4rem 0",

  "& .list": {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "8% 84% 6%",
    margin: "1rem 0",

    "& span": {
      position: "relative",
      background: "lightgray",
      height: "1.8rem",
      borderRadius: "3px",
      overflow: "hidden",

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

    "& .rank": {
      marginLeft: "0.5rem",
    },

    "& .keyword": {
      marginLeft: "2rem",
      marginRight: "2rem",
    },
  },
};

export const popularStyles: CSSObject = {
  marginTop: "6rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& h4": {
    width: "90%",
    fontSize: "1.2rem",
    color: "var(--basic-dark)",
    marginBottom: "1rem",
  },

  "& ul": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    "& a": {
      display: "flex",
      justifyContent: "center",

      "& li": {
        width: "90%",
        color: "var(--basic-font)",
        display: "grid",
        gridTemplateColumns: "30% 70%",
        margin: "2rem",

        "& img": {
          width: "10rem",
          borderRadius: "3px",
        },

        "& .textGroup": {
          height: "10rem",
          marginLeft: "1rem",

          "& h4": {
            fontSize: "1.4rem",
            marginBottom: "1rem",
            lineHeight: 1.2,
            color: "var(--main-color)",
          },

          "& p": {
            fontSize: "1.2rem",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          },
        },
      },

      "&:last-child": {
        marginBottom: "4rem",
      },
    },

    "&::before": {
      content: "''",
      width: "90%",
      borderTop: "0.5px solid var(--form-color)",
      marginBottom: "2rem",
    },
  },
};
