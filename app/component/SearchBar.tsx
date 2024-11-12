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
  const [sort, setSort] = useState<string>("relation");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue === "") return;

    try {
      const response = await axios.post("/api/news", { inputValue: inputValue, sort: sort });
      const result = response.status;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div css={css(form)}>
      <form css={css(searchBarForm)} onSubmit={onSubmit}>
        <div className="inputSet">
          <IoIosSearch className="searchIcon" />
          <input type="search" placeholder="Search" value={inputValue} onChange={onChange} />
          {inputValue && <MdCancel className="cancelIcon" onClick={() => setInputValue("")} />}
        </div>
        <div className="sortGroup">
          <button onClick={() => setSort("relation")}>정확도순</button>
          <button onClick={() => setSort("recent")}>최신순</button>
        </div>
      </form>
    </div>
  );
}
