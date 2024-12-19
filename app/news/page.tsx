/** @jsxImportSource @emotion/react */

"use client";

import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../component/SearchBar";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { newsListStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Loading from "../component/Loading";
import { useEffect } from "react";
import { setNewsAccess } from "@/store/news";

export default function News(): JSX.Element {
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const newsStatus = useSelector((state: RootState) => state.news.newsStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setNewsAccess(true));
    return () => {
      dispatch(setNewsAccess(false));
    };
  }, [dispatch]);

  // Loading UI 테스트용
  if (newsStatus === "loading") {
    return <Loading />;
  }

  return (
    <div>
      <SearchBar />
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
