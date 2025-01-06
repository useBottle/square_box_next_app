/** @jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import Topics from "../component/Topics";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getLatestNewsArticle, getLatestNewsList } from "../actions/latestNewsActions";
import { setLatestArticleSet, setLatestNewsList } from "@/store/latestNews";
import Image from "next/image";
import { latestNews } from "@/styles/LatestNews.styles";
import { css } from "@emotion/react";
import LatestNewsSkeleton from "../component/LatestNewsSkeleton";

export const dynamic = "force-dynamic";

export default function Home(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const latestNewsList = useSelector((state: RootState) => state.latestNews.latestNewsList);

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

  return (
    <div>
      <Topics />
      <div css={css(latestNews)}>
        <h4>최신 뉴스 Top 10</h4>
        <ul>
          {latestNewsList.length !== 0 && false ? (
            latestNewsList.map((item, index) => {
              return (
                <Link href={`/latest-news/detail?title=${encodeURIComponent(item.title)}`} key={index}>
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
            })
          ) : (
            <LatestNewsSkeleton />
          )}
        </ul>
      </div>
    </div>
  );
}
