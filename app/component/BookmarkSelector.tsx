/**@jsxImportSource @emotion/react */

"use client";

import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
      fontSize: "1.4rem",
      color: "var(--basic-font)",
      padding: "1rem 0",
      cursor: "pointer",
      border: "none",
      boxSizing: "border-box",
    },

    ".underline": {
      width: "100%",
      height: "1.5px",
      background: "var(--basic-font)",
    },
  },
};

export default function BookmarkSelector(): JSX.Element {
  const pathname = usePathname();
  const [selected, setSelected] = useState<string>("news");

  useEffect(() => {
    pathname === "/bookmark/news" && setSelected("news");
    pathname === "/bookmark/youtube" && setSelected("youtube");
  }, [pathname]);

  return (
    <div css={css(btnGroup)}>
      <Link href="/bookmark/news" onClick={() => setSelected("news")}>
        <button>NEWS</button>
        <div className="underline" style={selected === "news" ? {} : { background: "transparent" }} />
      </Link>
      <Link href="/bookmark/youtube" onClick={() => setSelected("youtube")}>
        <button>YOUTUBE</button>
        <div className="underline" style={selected === "youtube" ? {} : { background: "transparent" }} />
      </Link>
    </div>
  );
}
