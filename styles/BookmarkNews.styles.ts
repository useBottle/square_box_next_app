import { CSSObject } from "@emotion/react";

export const bookmarkNews: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",

  ".newsContainer": {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    h4: {
      width: "100%",
      fontSize: "1.2rem",
      color: "var(--basic-dark)",
      marginTop: "3rem",
      marginBottom: "5rem",
      borderBottom: "0.5px solid var(--form-color)",
      padding: "1rem 0",
      display: "flex",
      justifyContent: "space-between",
    },

    ".contents": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      ul: {
        li: {
          width: "100%",
          height: "10rem",
          overflow: "hidden",
          color: "var(--basic-font)",
          display: "grid",
          gridTemplateColumns: "35% 65%",
          marginBottom: "1.5rem",
          border: "1px solid #eee",
          borderRadius: "5px",
          boxSizing: "border-box",

          img: {
            width: "100%",
            height: "100%",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
          },

          ".textGroup": {
            padding: "1rem",
            height: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            boxSizing: "border-box",

            h6: {
              fontSize: "1.4rem",
              lineHeight: 1.2,
              color: "var(--main-color)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              lineClamp: 2,
              WebkitBoxOrient: "vertical",
            },

            ".date": {
              margin: "0.5rem 0",
            },

            p: {
              display: "none",
              // fontSize: "1.1rem",
              // lineHeight: 1.2,
              // overflow: "hidden",
              // textOverflow: "ellipsis",
              // display: "-webkit-box",
              // WebkitLineClamp: 1,
              // lineClamp: 2,
              // WebkitBoxOrient: "vertical",
            },
          },
        },

        "&:last-child": {
          marginBottom: "4rem",
        },
      },
    },

    ".emptyContents": {
      width: "100%",
      height: "30vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",

      p: {
        fontSize: "1.4rem",
      },
    },
  },
};
