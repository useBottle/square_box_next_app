/** @jsxImportSource @emotion/react */

"use client";

import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../component/SearchBar";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { newsListStyles } from "@/styles/News.styles";
import { css, CSSObject } from "@emotion/react";
import { useEffect } from "react";
import { setNewsAccess } from "@/store/news";
import NewsSkeleton from "../component/NewsSkeleton";

export default function News(): JSX.Element {
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const newsStatus = useSelector((state: RootState) => state.news.newsStatus);
  const dispatch = useDispatch<AppDispatch>();

  // 이건 왜 적용했었는지 찾아보고 필요 없을 경우 삭제.
  useEffect(() => {
    dispatch(setNewsAccess(true));
    return () => {
      dispatch(setNewsAccess(false));
    };
  }, [dispatch]);

  if (newsStatus === "loading") {
    return (
      <div>
        <SearchBar />
        <NewsSkeleton />
      </div>
    );
  }

  const initNews: CSSObject = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",

    "& h1": {
      fontSize: "1.6rem",
    },
  };

  return (
    <div>
      <SearchBar />
      {newsList.length === 0 && (
        <div css={css(initNews)}>
          <h1>뉴스를 검색해주세요</h1>
        </div>
      )}
      <ul css={css(newsListStyles)}>
        {newsList.map((item, index) => {
          return (
            <Link href={`/news/${index}`} key={index}>
              <li>
                <Image src={item.prevImg} alt="newsImg" width={100} height={100} />
                <div className="textGroup">
                  <h6>{item.title}</h6>
                  <div className="date">{item.date}</div>
                  <p>{item.summary}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
