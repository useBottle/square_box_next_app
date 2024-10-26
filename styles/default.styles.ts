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

  "&:focus": {
    border: "1.5px solid var(--main-color)",
    transition: "ease 0.3s",
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
};

export const searchBarForm: CSSObject = {
  display: "flex",
  alignItems: "center",
  width: "90%",

  "& .searchIcon": {
    position: "absolute",
    fontSize: "1.8rem",
    transform: "translateX(0.5rem)",
  },

  "& input": {
    width: "100%",
    padding: "1rem 3rem",
    border: "none",
    borderRadius: "3px",
    background: "#eee",
    outline: "none",
    color: "var(--basic-font)",

    "&::-ms-clear": {
      display: "none", // IE, Edge
    },

    "&::-webkit-search-cancel-button": {
      display: "none", // Chrome, Safari
    },
  },

  "& .cancelIcon": {
    position: "absolute",
    right: 0,
    fontSize: "1.6rem",
    transform: "translateX(-3rem)",
  },
};
