/** @jsxImportSource @emotion/react */

"use client";

import { searchBarForm } from "@/styles/default.styles";
import { css, CSSObject } from "@emotion/react";
import { IoIosSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const form: CSSObject = {
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  margin: "4rem 0",
};

export default function SearchBar(): JSX.Element {
  return (
    <div css={css(form)}>
      <form css={css(searchBarForm)}>
        <IoIosSearch className="searchIcon" />
        <input type="search" placeholder="Search" />
        <MdCancel className="cancelIcon" />
      </form>
    </div>
  );
}
