import { CSSObject } from "@emotion/react";

export const input: CSSObject = {
  width: "100%",
  padding: "0.8rem 1.2rem",
  fontSize: "1.4rem",
  border: "1.5px solid transparent",
  borderRadius: "3px",
  boxSizing: "border-box",
  lineHeight: 1.5,
  background: "#eee",
  margin: "0.6rem 0",
  outline: "none",
  color: "var(--basic-font)",

  "&:focus": {
    border: "1.5px solid var(--main-color)",
    transition: "ease 0.3s",
  },

  "@media (min-width: 1200px)": {
    height: "5rem",
    fontSize: "1.6rem",
  },
};

export const modalTitle: CSSObject = {
  fontSize: "2rem",
  color: "var(--basic-font)",
};

export const infoTitle: CSSObject = {
  fontSize: "2.2rem",
  color: "var(--basic-font)",
};

export const infoText: CSSObject = {
  fontSize: "1.4rem",
  color: "var(--basic-sub)",
};

export const globalBtn: CSSObject = {
  width: "100%",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "3px",
  fontSize: "1.4rem",
  boxSizing: "border-box",
  color: "#000",

  "@media (min-width: 1200px)": {
    height: "5rem",
    fontSize: "1.6rem",
  },
};

export const searchBarForm: CSSObject = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",

  ".inputSet": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "4rem",
    background: "#eee",
    border: "1.5px solid transparent",
    borderRadius: "3px",
    boxSizing: "border-box",

    ".searchIcon": {
      fontSize: "1.8rem",
    },

    input: {
      width: "85%",
      height: "95%",
      background: "#eee",
      border: "1.5px solid transparent",
      boxSizing: "border-box",
      outline: "none",
      color: "var(--basic-font)",

      "&::placeholder": {
        color: "var(--basic-font)",
        opacity: 0.5,
      },

      "&::-ms-clear": {
        display: "none", // IE, Edge
      },

      "&::-webkit-search-cancel-button": {
        display: "none", // Chrome, Safari
      },
    },

    ".cancelIcon": {
      width: "2rem",
      height: "2rem",
      fontSize: "1.6rem",
      marginLeft: "0.5rem",
      cursor: "pointer",
    },
  },

  "@media (min-width: 1200px)": {
    width: "100%",

    ".inputSet": {
      width: "100%",
      height: "5rem",

      ".searchIcon": {
        fontSize: "2.5rem",
      },

      input: {
        width: "90%",
        padding: "1.5rem 1rem",
        fontSize: "1.6rem",
      },
    },
  },
};
