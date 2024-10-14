import { CSSObject } from "@emotion/react";
import { globalBtn, input } from "./default.styles";

export const container: CSSObject = {
  "& form": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    "& input": {
      ...input,
    },

    "& button": {
      ...globalBtn,
      background: "var(--main-color)",
      color: "#fff",
    },
  },
};
