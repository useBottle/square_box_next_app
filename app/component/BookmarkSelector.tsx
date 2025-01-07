/**@jsxImportSource @emotion/react */

"use client";

import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";

const btnGroup: CSSObject = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  margin: "3rem 0",

  a: {
    width: "50%",

    button: {
      width: "100%",
      background: "transparent",
      border: "1.5px solid transparent",
      fontSize: "1.6rem",
      color: "var(--basic-font)",
      padding: "1rem 0",
      cursor: "pointer",
      boxSizing: "border-box",
    },
  },
};

export default function BookmarkSelector(): JSX.Element {
  const [selected, setSelected] = useState<string>("news");

  return (
    <div css={css(btnGroup)}>
      <Link href="/bookmark/news">
        <button
          onClick={() => setSelected("news")}
          style={selected === "news" ? { borderBottom: "1.5px solid var(--basic-font)" } : {}}
        >
          NEWS
        </button>
      </Link>
      <Link href="/bookmark/youtube">
        <button
          onClick={() => setSelected("youtube")}
          style={selected === "youtube" ? { borderBottom: "1.5px solid var(--basic-font)" } : {}}
        >
          YOUTUBE
        </button>
      </Link>
    </div>
  );
}
