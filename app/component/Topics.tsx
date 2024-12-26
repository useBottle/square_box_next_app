/** @jsxImportSource @emotion/react */

"use client";

import { topicsForm } from "@/styles/Topics.styles";
import { newsList, TopicsType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import TopicsSkeleton from "./TopicsSkeleton";
import Link from "next/link";
import { fetchArticles, fetchNews, fetchPopular } from "@/store/news";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function Topics(): JSX.Element {
  const [topics, setTopics] = useState<TopicsType[] | undefined>(undefined);
  const [totalNews, setTotalNews] = useState<newsList[][] | undefined>([]);
  const dispatch = useDispatch<AppDispatch>();

  const fetchKeyword = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/topics");
      setTopics(response.data.top10);
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
    }
  };

  // 한국일보 인기 뉴스 리스트 가져오는 함수
  const fetchPopularList = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/latestNews");
      setTotalNews(response.data.totalNewsData);
    } catch (error) {
      console.error("Failed fetching popular data.", error);
    }
  };

  const clickKeyword = async (keyword: string) => {
    if (keyword === "") return;

    try {
      const result = await dispatch(fetchNews(keyword)).unwrap();
      const urls = result[1];
      if (urls.length !== 0) {
        await dispatch(fetchArticles(urls));
      }
    } catch (error) {
      console.error("Failed fetching news data of top10 keyword.", error);
    }
  };

  // 한국일보 데이터 가져오는걸로 변경해야함.
  const clickPopular = async (link: string) => {
    if (!link) return;

    try {
      await dispatch(fetchPopular(link));
    } catch (error) {
      console.error("Failed fetching news data of popular news.", error);
    }
  };

  useEffect(() => {
    fetchKeyword();
    const intervalFetch = setInterval(() => {
      fetchKeyword();
    }, 10000);

    return () => clearInterval(intervalFetch);
  }, []);

  return (
    <div>
      <div css={css(topicsForm)}>
        <h4>실시간 검색어 Top 10</h4>
        {topics ? (
          <ul>
            {topics.map((item, index) => {
              return (
                <Link href="/news" key={index} onClick={() => clickKeyword(item.keyword)}>
                  <li>
                    <span className="rank">{item.rank}</span>
                    <span className="keyword">{item.keyword}</span>
                    <span className="state">
                      {(() => {
                        if (item.state === "n") {
                          return <FaPlus className="new" />;
                        } else if (item.state === "s") {
                          return <FaMinus className="stay" />;
                        } else if (item.state === "+") {
                          return <FaCaretUp className="up" />;
                        } else if (item.state === "-") {
                          return <FaCaretDown className="down" />;
                        }
                      })()}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <TopicsSkeleton />
        )}
      </div>
    </div>
  );
}
