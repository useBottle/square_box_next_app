/** @jsxImportSource @emotion/react */

"use client";

import { setNews } from "@/store/news";
import { AppDispatch } from "@/store/store";
import { searchBarForm } from "@/styles/default.styles";
import { css, CSSObject } from "@emotion/react";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";

const form: CSSObject = {
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  margin: "4rem 0",
};

export default function SearchBar(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [sort, setSort] = useState<string>("relation");
  const dispatch = useDispatch<AppDispatch>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const requestData = async () => {
    if (inputValue === "") return;

    const response = await axios.post("/api/news", { inputValue: inputValue, sort: sort });
    const result = response.data.newsData;
    dispatch(setNews(result));
    console.log(result);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === "") return;

    try {
      requestData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestData();
  }, [sort]);

  return (
    <div css={css(form)}>
      <form css={css(searchBarForm)} onSubmit={onSubmit}>
        <div className="inputSet">
          <IoIosSearch className="searchIcon" />
          <input type="search" placeholder="Search" value={inputValue} onChange={onChange} />
          {inputValue && <MdCancel className="cancelIcon" onClick={() => setInputValue("")} />}
        </div>
        <div className="sortGroup">
          <button
            type="button"
            onClick={() => {
              setSort("relation");
            }}
            style={{ borderBottom: sort === "relation" ? "1px solid var(--basic-font)" : "none" }}
          >
            정확도순
          </button>
          <button
            type="button"
            onClick={() => {
              setSort("recent");
            }}
            style={{ borderBottom: sort === "recent" ? "1px solid var(--basic-font)" : "none" }}
          >
            최신순
          </button>
        </div>
      </form>
    </div>
  );
}
