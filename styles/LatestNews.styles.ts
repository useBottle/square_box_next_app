import { CSSObject } from "@emotion/react";

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

    ".infoText": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontSize: "1.6rem",
      marginTop: "4rem",
      marginBottom: "10rem",
    },
  },
};
