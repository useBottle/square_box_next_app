/** @jsxImportSource @emotion/react */

"use client";

import { topicsForm } from "@/styles/Topics.styles";
import { TopicsType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Link from "next/link";
import { fetchArticles, fetchNews } from "@/store/news";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function Topics({ data }: { data: TopicsType[] | undefined }): JSX.Element {
  const [topics, setTopics] = useState<TopicsType[] | undefined>(undefined);
  const [clickedKeyword, setClickedKeyword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
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

    if (clickedKeyword === "" || clickedKeyword === undefined) return;
    if (clickedKeyword !== "") clickKeyword(clickedKeyword);
  }, [clickedKeyword]);

  useEffect(() => {
    // 서버에서 가져온 최초 실시간 검색어 데이터로 업데이트.
    // setTopics(data);

    const fetchKeyword = async (): Promise<void> => {
      try {
        const response = await axios.get("/api/topics");
        setTopics(response.data.top10);
      } catch (error) {
        console.error("Failed fetching keyword data.", error);
      }
    };

    // TopicsServerComponent 에서 로드한 실시간 검색어를 먼저 렌더링 후 인터벌로 업데이트.
    const intervalFetch = setInterval(() => {
      fetchKeyword();
    }, 10000);

    return () => clearInterval(intervalFetch);
  }, []);

  return (
    <div>
      <div css={css(topicsForm)}>
        <h4>실시간 검색어 Top 10</h4>
        <ul>
          {(data || topics)?.map((item, index) => {
            return (
              <Link href="/news" key={index} onClick={() => setClickedKeyword(item.keyword)}>
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
      </div>
    </div>
  );
}
