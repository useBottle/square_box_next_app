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

      "& img": {
        width: "10rem",
        borderRadius: "3px",
      },

      "& .textGroup": {
        height: "10rem",
        marginLeft: "1rem",

        "& h6": {
          fontSize: "1.4rem",
          marginBottom: "1rem",
          lineHeight: 1.2,
          color: "var(--main-color)",
        },

        "& .date": {
          margin: "1rem 0",
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
};
