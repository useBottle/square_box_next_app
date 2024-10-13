import { CSSObject } from "@emotion/react";
import { input } from "./default.styles";

export const form: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  "& input": {
    ...input,
  },
};
