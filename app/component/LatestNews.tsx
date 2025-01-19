/** @jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getLatestNewsList } from "../actions/latestNewsActions";
import { setLatestNewsArticle, setLatestNewsList, setLatestNewsUrl } from "@/store/latestNews";
import Image from "next/image";
import { latestNews } from "@/styles/LatestNews.styles";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { newsList } from "@/types/types";
import { setInputValue } from "@/store/switches";

export default function LatestNews({
  data,
}: {
  data: { latestNewsListFromServer: newsList[] | undefined };
}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const latestNewsList = useSelector((state: RootState) => state.latestNews.latestNewsList);
  const latestNewsArticle = useSelector((state: RootState) => state.latestNews.latestNewsArticle);
  const { latestNewsListFromServer } = data;
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);
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

  const onClick = (clickedTitle: string, href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // 디스패치 되어있는 최신 뉴스 기사와 클릭한 최신 뉴스 기사가 다를 경우 초기화.
    // 기사 상세 페이지 접속 시 이전 데이터로 깜박임 현상 방지하기 위함.
    if (latestNewsArticle.title !== clickedTitle) {
      dispatch(setLatestNewsArticle({ title: "", date: "", image: "", alt: "", text: [] }));
    }
    dispatch(setLatestNewsUrl(href));
    dispatch(setInputValue(clickedTitle));
    router.push(`/latest-news/detail?title=${encodeURIComponent(clickedTitle)}`);
  };

  return (
    <div css={css(latestNews)}>
      {!navMenu && (
        <div className="latestNewsWrapper">
          <h4>최신 뉴스 Top 10</h4>
          <ul>
            {(latestNewsList || latestNewsListFromServer)?.map((item, index) => {
              return (
                <Link
                  href={`/latest-news/detail?title=${encodeURIComponent(item.title)}`}
                  key={index}
                  onClick={onClick(item.title, item.href)}
                  className={/Mobi/i.test(navigator.userAgent) ? "noHover" : ""}
                >
                  <li>
                    <div className="imgContainer">
                      <Image src={item.prevImg} width={100} height={100} alt="newsImg" />
                    </div>
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
      )}
    </div>
  );
}
