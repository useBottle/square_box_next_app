/** @jsxImportSource @emotion/react */

"use client";

import { fetchArticles, fetchNewsList } from "@/store/news";
import { AppDispatch, RootState } from "@/store/store";
import { setInputValue } from "@/store/switches";
import { fetchYoutube } from "@/store/youtube";
import { searchBarForm } from "@/styles/default.styles";
import { css, CSSObject } from "@emotion/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const form: CSSObject = {
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  margin: "4rem 0",
};

export default function SearchBar(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  // const [inputValue, setInputValue] = useState<string>("");
  const pageAccess = useSelector((state: RootState) => state.switches.pageState);
  const onKeyword = useSelector((state: RootState) => state.news.newsList.keyword);
  const inputValue = useSelector((state: RootState) => state.switches.inputValue);

  // 뉴스 리스트 또는 실시간 검색어를 클릭한 경우, 해당 키워드로 inputValue 업데이트
  useEffect(() => {
    dispatch(setInputValue(onKeyword));
  }, [onKeyword]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") return;

    if (pageAccess === "news") {
      try {
        const result = await dispatch(fetchNewsList(inputValue)).unwrap();
        const urls = result.urls;
        if (urls.length !== 0) {
          await dispatch(fetchArticles(urls));
        }
        return;
      } catch (error) {
        console.error("Error occurred. News fetch failed.", error);
      }
    }

    if (pageAccess === "youtube") {
      try {
        await dispatch(fetchYoutube(inputValue));
        return;
      } catch (error) {
        console.error("Error occurred. Youtube fetch failed.", error);
      }
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
