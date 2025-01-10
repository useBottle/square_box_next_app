/** @jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getLatestNewsList } from "../actions/latestNewsActions";
import { setLatestNewsList, setLatestNewsUrl } from "@/store/latestNews";
import Image from "next/image";
import { latestNews } from "@/styles/LatestNews.styles";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { newsList } from "@/types/types";
import { setInputValue } from "@/store/switches";

export default function LatestNews({ data }: { data: { latestNewsList: newsList[] | undefined } }): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const storedLatestNewsList = useSelector((state: RootState) => state.latestNews.latestNewsList);
  const { latestNewsList } = data;
  const router = useRouter();

  // 인터벌로 최신 뉴스 리스트 업데이트
  useEffect(() => {
    const fetchData = async () => {
      const result = await getLatestNewsList();
      dispatch(setLatestNewsList(result?.newsTop10List));
    };

    // 10분마다 최신 뉴스 리스트 갱신 요청.
    const intervalFetch = setInterval(() => fetchData(), 1000 * 60);

    return () => clearInterval(intervalFetch);
  }, []);

  const onClick = (clickedtitle: string, href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setLatestNewsUrl(href));
    dispatch(setInputValue(clickedtitle));
    router.push(`/latest-news/detail?title=${encodeURIComponent(clickedtitle)}`);
  };

  return (
    <div css={css(latestNews)}>
      <h4>최신 뉴스 Top 10</h4>
      <ul>
        {storedLatestNewsList.length === 0
          ? latestNewsList?.map((item, index) => {
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
