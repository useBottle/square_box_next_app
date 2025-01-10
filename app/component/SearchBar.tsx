/** @jsxImportSource @emotion/react */

"use client";

import { fetchArticles, fetchNewsList } from "@/store/news";
import { AppDispatch, RootState } from "@/store/store";
import { setInputValue, setOnSearching } from "@/store/switches";
import { fetchYoutube } from "@/store/youtube";
import { searchBarForm } from "@/styles/default.styles";
import { css, CSSObject } from "@emotion/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect } from "react";
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
  const pageAccess = useSelector((state: RootState) => state.switches.pageState);
  const inputValue = useSelector((state: RootState) => state.switches.inputValue);
  const pathName = usePathname();
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") return;
    dispatch(setOnSearching(true));

    if (pageAccess === "news") {
      try {
        const result = await dispatch(fetchNewsList(inputValue)).unwrap();
        const urls = result.urls;
        if (urls.length !== 0) {
          await dispatch(fetchArticles({ keyword: inputValue, urls: urls }));
        }
        // urls 를 디스패치하고 news 페이지에서 articles 요청해 디스패치하도록 적용해야함.
        pathName !== "/news" && router.push("/news");
      } catch (error) {
        console.error("Error occurred. News fetch failed.", error);
      }
    }

    if (pageAccess === "youtube") {
      try {
        await dispatch(fetchYoutube(inputValue));
      } catch (error) {
        console.error("Error occurred. Youtube fetch failed.", error);
      }
    }
    dispatch(setOnSearching(false));
  };

  return (
    <div css={css(form)}>
      <form css={css(searchBarForm)} onSubmit={onSubmit}>
        <div className="inputSet">
          <IoIosSearch className="searchIcon" />
          <input type="search" placeholder="Search" value={inputValue} onChange={onChange} />
          {inputValue && <MdCancel className="cancelIcon" onClick={() => dispatch(setInputValue(""))} />}
        </div>
      </form>
    </div>
  );
}
