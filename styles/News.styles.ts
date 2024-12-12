import { CSSObject } from "@emotion/react";

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
      color: "var(--basic-font)",
      display: "grid",
      gridTemplateColumns: "30% 70%",
      margin: "1rem",
      border: "1px solid #eee",
      padding: "1rem 1rem",
      borderRadius: "3px",
      boxSizing: "border-box",

      "& img": {
        width: "10rem",
        borderRadius: "3px",
      },

      "& .textGroup": {
        height: "10rem",
        marginLeft: "1.4rem",

        "& h6": {
          fontSize: "1.4rem",
          marginBottom: "0.5rem",
          lineHeight: 1.2,
          color: "var(--main-color)",
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
          WebkitLineClamp: 2,
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
