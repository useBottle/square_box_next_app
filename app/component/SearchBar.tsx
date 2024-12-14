/** @jsxImportSource @emotion/react */

"use client";

import { setArticles, setNews } from "@/store/news";
import { AppDispatch } from "@/store/store";
import { searchBarForm } from "@/styles/default.styles";
import { newsList } from "@/types/types";
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
  const dispatch = useDispatch<AppDispatch>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const requestNewsList = async () => {
    try {
      if (inputValue === "") return;

      const response = await axios.post("/api/news", { inputValue: inputValue, sort: "relation" });
      const result = response.data.newsData;
      dispatch(setNews(result));

      const urls: string[] = [];
      result.map((item: newsList) => {
        if (item.href !== "") {
          urls.push(item.href);
        }
      });
      const requestArticles = await axios.post("/api/articles", { url: urls });
      const articles = requestArticles.data.articleData;
      dispatch(setArticles(articles));
      // console.log(articles);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === "") return;

    try {
      requestNewsList();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    requestNewsList();
  }, []);

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
