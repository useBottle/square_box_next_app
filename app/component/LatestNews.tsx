/** @jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getLatestNewsArticle, getLatestNewsList } from "../actions/latestNewsActions";
import { setLatestArticleSet, setLatestNewsList } from "@/store/latestNews";
import Image from "next/image";
import { latestNews } from "@/styles/LatestNews.styles";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { LatestNewsProps } from "@/types/types";

export default function LatestNews({ data }: LatestNewsProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const storedLatestNews = useSelector((state: RootState) => state.latestNews.latestNewsList);
  const [clickedNewsTitle, setClickedNewsTitle] = useState<string>("");
  const router = useRouter();
  const { latestNewsList, latestArticles } = data;

  useEffect(() => {
    if (storedLatestNews.length === 0 && latestNewsList) {
      dispatch(setLatestNewsList(latestNewsList));
    }
  }, [clickedNewsTitle]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLatestNewsList();
      dispatch(setLatestNewsList(result?.newsTop10List));

      const articles = await getLatestNewsArticle(result?.urls as string[]);
      dispatch(setLatestArticleSet(articles));
    };

    fetchData();

    // 10분마다 최신 뉴스 리스트 갱신 요청.
    const intervalFetch = setInterval(
      () => {
        fetchData();
      },
      1000 * 60 * 10,
    );

    return () => clearInterval(intervalFetch);
  }, []);

  const onClick = (title: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setClickedNewsTitle(title);
    router.push(`/latest-news/detail?title=${encodeURIComponent(title)}`);
  };

  return (
    <div css={css(latestNews)}>
      <h4>최신 뉴스 Top 10</h4>
      <ul>
        {(latestNewsList || storedLatestNews)?.map((item, index) => {
          return (
            <Link
              href={`/latest-news/detail?title=${encodeURIComponent(item.title)}`}
              key={index}
              onClick={onClick(item.title)}
            >
              <li>
                <Image src={item.prevImg} width={100} height={100} alt="newsImg" />
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
