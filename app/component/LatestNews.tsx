/** @jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getLatestNewsArticle, getLatestNewsList } from "../actions/latestNewsActions";
import { setLatestNewsArticle, setLatestNewsArticleSet, setLatestNewsList, setLatestNewsUrl } from "@/store/latestNews";
import Image from "next/image";
import { latestNews } from "@/styles/LatestNews.styles";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { LatestNewsProps } from "@/types/types";
import { setInputValue } from "@/store/switches";

export default function LatestNews({ data }: LatestNewsProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const storedLatestNewsList = useSelector((state: RootState) => state.latestNews.latestNewsList);
  const storedLatestNewsArticles = useSelector((state: RootState) => state.latestNews.latestNewsArticleSet);
  const { latestNewsList, latestNewsArticles } = data;
  const router = useRouter();

  // 인터벌로 최신 뉴스 리스트 업데이트 및 각 리스트 요소 별 뉴스 기사 요청하여 업데이트
  useEffect(() => {
    console.log(latestNewsArticles);
    const fetchData = async () => {
      const result = await getLatestNewsList();
      dispatch(setLatestNewsList(result?.newsTop10List));

      const articles = await getLatestNewsArticle(result?.urls as string[]);
      dispatch(setLatestNewsArticleSet(articles));
    };

    // 10분마다 최신 뉴스 리스트 갱신 요청.
    const intervalFetch = setInterval(() => fetchData(), 1000 * 60);

    return () => clearInterval(intervalFetch);
  }, []);

  const onClick = (clickedtitle: string, href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setLatestNewsUrl(href));

    /* 
    최신 뉴스 클릭 시 클라이언트에서 최신 뉴스 리스트 및 뉴스 기사를 디스패치 하기 전이면 
    서버에서 가져온 articles 중 클릭한 타이틀과 일치하는 것으로 디스패치 
    */
    if (storedLatestNewsList.length === 0 && latestNewsList) {
      dispatch(setLatestNewsArticle(latestNewsArticles.filter((article) => article.title === clickedtitle)[0]));
    }

    /* 
    최신 뉴스 클릭 시 클라이언트에서 최신 뉴스 리스트 및 뉴스 기사를 디스패치한 이후면
    디스패치된 최신 뉴스 기사 세트 중 클릭한 타이틀과 일치하는 것으로 디스패치 
    */
    if (storedLatestNewsArticles.length !== 0) {
      dispatch(setLatestNewsArticle(storedLatestNewsArticles.filter((article) => article.title === clickedtitle)[0]));
    }
    dispatch(setInputValue(clickedtitle));
    router.push(`/latest-news/detail?title=${encodeURIComponent(clickedtitle)}`);
  };

  return (
    <div css={css(latestNews)}>
      <h4>최신 뉴스 Top 10</h4>
      <ul>
        {storedLatestNewsList.length === 0
          ? latestNewsList.map((item, index) => {
              return (
                <Link
                  href={`/latest-news/detail?title=${encodeURIComponent(item.title)}`}
                  key={index}
                  onClick={onClick(item.title, item.href)}
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
            })
          : storedLatestNewsList.map((item, index) => {
              return (
                <Link
                  href={`/latest-news/detail?title=${encodeURIComponent(item.title)}`}
                  key={index}
                  onClick={onClick(item.title, item.href)}
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
