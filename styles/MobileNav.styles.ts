/** @jsxImportSource @emotion/react */

import { CSSObject } from "@emotion/react";

export const nav: CSSObject = {
  position: "fixed",
  width: "100%",
  height: "100%",
  background: "var(--background)",
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  ".back": {
    position: "absolute",
    top: "1.5rem",
    right: "5%",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  ".logoPlate": {
    width: "90%",
    height: "4rem",
    margin: "2rem 0",
    borderRadius: "3px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    ".logo": {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      fontSize: "2rem",
      color: "#fff",
      zIndex: 100,
    },

    ".overlay": {
      position: "absolute",
      width: "100%",
      height: "4rem",
      backdropFilter: "blur(5px)",
      zIndex: 99,
    },

    img: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },

  ".userPlate": {
    width: "90%",
    height: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 0",
    margin: "2rem 0",

    img: {
      borderRadius: "50%",
    },

    ".replacedImg": {
      fontSize: "4rem",
    },

    ".userName": {
      marginTop: "1rem",
      fontSize: "1.6rem",
    },
  },

  ul: {
    marginTop: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "90%",

    li: {
      width: "100%",
      margin: "1rem 0",

      "& .list": {
        width: "100%",
        height: "5rem",
        background: "transparent",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.6rem",
        color: "var(--basic-font)",
      },
    },

    ".auth": {
      width: "100%",
      height: "5rem",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "1px solid #eee",
      background: "transparent",
      color: "var(--basic-font)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "1.6rem",
      margin: "1rem 0",
      padding: "0 0",
    },
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    width: "50vw",
    justifyContent: "space-between",

    ".logoPlate": {
      height: "6rem",
      width: "98%",
      marginTop: "8rem",

      ".logo": {
        fontSize: "2.5rem",
      },

      ".overlay": {
        height: "6rem",
        width: "100%",
      },
    },

    ".userPlate": {
      width: "100%",

      img: {
        width: "6rem",
        height: "6rem",
      },

      ".replacedImg": {
        fontSize: "6rem",
      },

      ".userName": {
        marginTop: "3rem",
        fontSize: "2.5rem",
      },
    },

    ul: {
      width: "100%",
      margin: "10rem 0",

      li: {
        margin: "2rem 0",

        ".list": {
          fontSize: "1.8rem",
          height: "6rem",
        },
      },

      ".auth": {
        fontSize: "1.8rem",
      },
    },
  },

  "@media (min-width: 2000px)": {
    width: "40vw",
  },
};
