import { CSSObject } from "@emotion/react";

export const bookmarkYoutube: CSSObject = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",

  ".youtubeContainer": {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10rem",

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",

        a: {
          width: "90%",
          margin: "2rem 0",

          li: {
            width: "100%",
            border: "1px solid #eee",
            borderRadius: "5px",
            boxSizing: "border-box",
            marginBottom: "1.5rem",

            img: {
              width: "100%",
              height: "auto",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            },

            ".textGroup": {
              padding: "1rem",

              ".title": {
                fontSize: "2rem",
                color: "var(--title-color)",
                margin: "1rem 0",
              },

              ".channel": {
                fontSize: "1.4rem",
                padding: "0.5rem 1rem",
                color: "var(--reverse-font)",
                background: "var(--basic-font)",
                border: "1px solid var(--basic-font)",
                borderRadius: "3px",
                width: "fit-content",
                margin: "2rem 0",
              },

              ".publishedAt": {
                fontSize: "1.2rem",
                color: "var(--basic-dark)",
                margin: "2rem 0",
              },

              ".description": {
                fontSize: "1.4rem",
                color: "var(--basic-font)",
                margin: "1rem 0",
              },
            },
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
  },
};
