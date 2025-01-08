/** @jsxImportSource @emotion/react */

"use client";

import { topicsForm } from "@/styles/Topics.styles";
import { newsList, TopicsType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Link from "next/link";
import { fetchArticles, fetchNews, fetchNewsOfTopics, setNewsList } from "@/store/news";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

interface TopicsProps {
  data: {
    keywordsData: TopicsType[] | undefined;
    newsOfTopicsList: newsList[][] | undefined;
  };
}

export default function Topics({ data }: TopicsProps): JSX.Element {
  const [topics, setTopics] = useState<TopicsType[] | undefined>(undefined);
  const [clickedIndex, setClickedIndex] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (topics === undefined && data.newsOfTopicsList?.length !== 0) {
      dispatch(setNewsList(data.newsOfTopicsList?.[clickedIndex] || []));
    }
    // topics 가 업데이트 되었을 때, 클릭하면 가져온 데이터로 업데이트하는 로직 추가하기.
  }, [clickedIndex]);

  useEffect(() => {
    const fetchKeyword = async (): Promise<void> => {
      try {
        const topicsResponse = await axios.get("/api/topics");
        // const results = await Promise.all(
        //   topicsResponse.data.top10.map(async (item: TopicsType) => {
        //     fetchNewsOfTopics([item.keyword]);
        //     // const result = await dispatch(fetchNews(item.keyword)).unwrap();
        //     // const urls = result[1];
        //     // if (urls.length !== 0) {
        //     //   await dispatch(fetchArticles(urls));
        //     // }
        //   }),
        // );
        // console.log(results);
        setTopics(topicsResponse.data.top10);
      } catch (error) {
        console.error("Failed fetching keyword data.", error);
      }
    };

    // TopicsContainer 에서 로드한 실시간 검색어를 먼저 렌더링 후 인터벌로 업데이트.
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
          {(data.keywordsData || topics)?.map((item, index) => {
            return (
              <Link href="/news" key={index} onClick={() => setClickedIndex(index)}>
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
