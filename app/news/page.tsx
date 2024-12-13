/** @jsxImportSource @emotion/react */

"use client";

import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../component/SearchBar";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { newsListStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { setArticles } from "@/store/news";
import axios from "axios";

export default function News(): JSX.Element {
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchArticles = async () => {
      const urls: string[] = [];
      newsList.map((item) => {
        if (item.href !== "") {
          urls.push(item.href);
        }
      });
      const response = await axios.post("/api/articles", { url: urls });
      const result = response.data.articleData;
      dispatch(setArticles(result));
      console.log(result);
    };
    fetchArticles();
  }, [newsList, dispatch]);

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
