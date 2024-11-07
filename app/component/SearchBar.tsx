/** @jsxImportSource @emotion/react */

"use client";

import { searchBarForm } from "@/styles/default.styles";
import { css, CSSObject } from "@emotion/react";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const form: CSSObject = {
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  margin: "4rem 0",
};

export default function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue === "") return;

    try {
      const response = await axios.post("/api/news", { inputValue: inputValue });
      const result = response.status;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div css={css(form)}>
      <form css={css(searchBarForm)} onSubmit={onSubmit}>
        <IoIosSearch className="searchIcon" />
        <input type="search" placeholder="Search" value={inputValue} onChange={onChange} />
        {inputValue && <MdCancel className="cancelIcon" onClick={() => setInputValue("")} />}
      </form>
    </div>
  );
}
