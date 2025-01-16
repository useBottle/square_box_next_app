/** @jsxImportSource @emotion/react */

"use client";

import { fetchNewsList } from "@/store/news";
import { AppDispatch, RootState } from "@/store/store";
import { setInputValue, setOnSearching } from "@/store/switches";
import { fetchYoutube } from "@/store/youtube";
import { searchBarForm } from "@/styles/default.styles";
import { css, CSSObject } from "@emotion/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const form: CSSObject = {
  display: "flex",
  justifyContent: "center",
  width: "100vw",
  margin: "4rem 0",

  // 태블릿 뷰
  "@media (min-width: 960px)": {
    width: "100%",
    marginBottom: "5rem",
  },

  // 데스크탑 뷰
  "@media (min-width: 1200px)": {
    marginBottom: "10rem",
  },
};

export default function SearchBar(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const pageAccess = useSelector((state: RootState) => state.switches.pageState);
  const inputValue = useSelector((state: RootState) => state.switches.inputValue);
  const pathName = usePathname();
  const router = useRouter();
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") return;
    dispatch(setOnSearching(true));
    // onSearching 해제는 페이지 이동 후 해당 페이지에서 적용.

    if (pageAccess === "news") {
      try {
        // 뉴스 검색 시 뉴스 리스트 요청 후 키워드, 리스트, urls 디스패치
        await dispatch(fetchNewsList(inputValue));
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
  };

  return (
    <div css={css(form)}>
      <form css={css(searchBarForm)} onSubmit={onSubmit}>
        <div className={`inputSet ${inputFocused ? "borderOn" : ""}`}>
          <IoIosSearch className="searchIcon" />
          <input
            type="search"
            placeholder="Search"
            value={inputValue}
            onChange={onChange}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          {inputValue ? (
            <MdCancel className="cancelIcon" onClick={() => dispatch(setInputValue(""))} />
          ) : (
            <div className="cancelIcon" />
          )}
        </div>
      </form>
    </div>
  );
}
