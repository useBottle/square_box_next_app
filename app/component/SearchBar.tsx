/** @jsxImportSource @emotion/react */

"use client";

import { fetchArticles, fetchNews } from "@/store/news";
import { AppDispatch } from "@/store/store";
import { searchBarForm } from "@/styles/default.styles";
import { css, CSSObject } from "@emotion/react";
import { ChangeEvent, FormEvent, useState } from "react";
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
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") return;

    try {
      const result = await dispatch(fetchNews(inputValue)).unwrap();
      const urls = result[1];
      if (urls.length !== 0) {
        await dispatch(fetchArticles(urls));
      }
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
      </form>
    </div>
  );
}
