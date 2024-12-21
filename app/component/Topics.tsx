/** @jsxImportSource @emotion/react */

"use client";

import { popularStyles, topicsForm } from "@/styles/Topics.styles";
import { PopularNews, TopicsType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import TopicsSkeleton from "./TopicsSkeleton";
import PopularNewsSkeleton from "./PopularNewsSkeleton";
import Image from "next/image";
import Link from "next/link";

export default function Topics(): JSX.Element {
  const [topics, setTopics] = useState<TopicsType[] | undefined>(undefined);
  const [popularNews, setPopularNews] = useState<PopularNews[] | undefined>(undefined);

  const fetchKeyword = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/topics");
      setTopics(response.data.top10);
      setPopularNews(response.data.articles);
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
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
                <Link href="/news" key={index} onClick={() => console.log("clicked")}>
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
      <div css={css(popularStyles)}>
        <h4>인기 뉴스 Top 10</h4>
        {popularNews ? (
          <ul>
            {popularNews.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <li>
                    <Image src={item.image} width={100} height={100} alt="newsImg" />
                    <div className="textGroup">
                      <h6>{item.title}</h6>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <PopularNewsSkeleton />
        )}
      </div>
    </div>
  );
}
