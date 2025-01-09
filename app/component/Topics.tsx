/** @jsxImportSource @emotion/react */

"use client";

import { topicsForm } from "@/styles/Topics.styles";
import { articleData, newsList, newsListWithKeyword, TopicsProps, TopicsType } from "@/types/types";
import { css } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Link from "next/link";
import { setArticles, setNewsList, setTotalArticles } from "@/store/news";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

export default function Topics({ data }: TopicsProps): JSX.Element {
  const [topics, setTopics] = useState<TopicsType[] | undefined>(undefined);
  const [clickedKeyword, setClickedKeyword] = useState<string>("");
  const [newsListArray, setNewsListArray] = useState<newsListWithKeyword[] | undefined>(undefined);
  const totalArticles = useSelector((state: RootState) => state.news.totalArticles);
  const dispatch = useDispatch<AppDispatch>();

  // 실시간 검색어를 클릭하면 해당 키워드에 대한 뉴스 리스트 업데이트.
  useEffect(() => {
    // topics 가 최초 업데이트 되기 전이면 서버에서 가져온 데이터로 뉴스 리스트 및 뉴스 기사들 업데이트.
    if (topics === undefined && data.newsOfTopicsList?.length !== 0) {
      dispatch(
        setNewsList(
          data.newsOfTopicsList?.filter((item) => item.keyword === clickedKeyword)[0] || { keyword: "", newsList: [] },
        ),
      );

      dispatch(
        setArticles(
          data.totalArticles?.filter((item) => item.keyword === clickedKeyword)[0] || { keyword: "", articles: [] },
        ),
      );
    }

    // topics 가 업데이트되면 여기서 fetchKeyword 로 가져온 데이터로 뉴스 리스트 및 뉴스 기사들 업데이트.
    if (topics !== undefined && newsListArray !== undefined) {
      dispatch(
        setNewsList(
          newsListArray.filter((item) => item.keyword === clickedKeyword)[0] || { keyword: "", newsList: [] },
        ),
      );
      dispatch(
        setArticles(
          totalArticles.filter((item) => item.keyword === clickedKeyword)[0] || { keyword: "", articles: [] },
        ),
      );
    }
  }, [clickedKeyword, newsListArray]);

  useEffect(() => {
    const fetchKeyword = async () => {
      try {
        const topicsResponse = await axios.get("/api/topics");
        // 실시간 검색어 별로 순회하여 뉴스 리스트 요청 후 배열로 상태 업데이트.

        // 모든 실시간 검색어 키워드에 해당하는 뉴스 리스트들의 각 뉴스 기사 데이터.
        const articlesOfTopics: { keyword: string; articles: articleData[] }[] = [];

        const results = await Promise.all(
          topicsResponse.data.top10.map(async (item: TopicsType) => {
            const response = await axios.post("/api/news", {
              inputValue: item.keyword,
              sort: "relation",
            });
            const data = {
              keyword: item.keyword,
              newsList: response.data.newsList,
            };

            const urls: string[] = [];

            response.data.newsList.forEach((item: newsList) => {
              if (item.href !== "") {
                urls.push(item.href);
              }
            });

            // 키워드에 해당하는 뉴스 리스트의 각 뉴스 기사 데이터 요청.
            const responseArticles = await axios.post("/api/articles", { urls: urls });
            const articlesData = {
              keyword: item.keyword,
              articles: responseArticles.data.articlesData,
            };

            // 위의 뉴스 리스트의 각 뉴스 기사 데이터 (articles) 를 articlesOfTopics 배열에 푸쉬.
            articlesOfTopics.push(articlesData);

            return data;
          }),
        );
        setNewsListArray(results);
        setTopics(topicsResponse.data.top10);
        dispatch(setTotalArticles(articlesOfTopics));
      } catch (error) {
        console.error("Failed fetching keyword data.", error);
      }
    };

    // TopicsContainer 에서 로드한 실시간 검색어를 먼저 렌더링 후 인터벌로 업데이트.
    const intervalFetch = setInterval(() => {
      fetchKeyword();
    }, 1000 * 60);

    return () => clearInterval(intervalFetch);
  }, []);

  return (
    <div>
      <div css={css(topicsForm)}>
        <h4>실시간 검색어 Top 10</h4>
        <ul>
          {(topics || data.keywordsData)?.map((item, index) => {
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
