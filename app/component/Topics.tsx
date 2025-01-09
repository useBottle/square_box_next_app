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
import { useRouter } from "next/navigation";

/**
 * Topics.tsx
 * 실시간 검색어를 서버에서 받아와 최초 렌더링 후 인터벌로 업데이트하여 다시 받아오는 클라이언트 컴포넌트.
 *
 * @params data - 실시간 검색어 Top10 키워드, 관련 뉴스 리스트, 관련 뉴스 기사 데이터
 * @params data.keywordsData - 실시간 검색어 Top10 키워드
 * @params data.newsOfTopicsList - 실시간 검색어 키워드 각각의 뉴스 리스트
 * @params data.totalArticles - 실시간 검색어 키워드 각각의 뉴스 리스트를 순회한 전체 뉴스 기사
 */

export default function Topics({ data }: TopicsProps): JSX.Element {
  const [topics, setTopics] = useState<TopicsType[] | undefined>(undefined);
  const [newsListArray, setNewsListArray] = useState<newsListWithKeyword[] | undefined>(undefined);
  const storedTotalArticles = useSelector((state: RootState) => state.news.totalArticles);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { newsOfTopicsList, keywordsData, totalArticles } = data;

  useEffect(() => {
    /**
     * fetchKeyword
     * 실시간 검색어를 순회하여 각 검색어에 해당하는 뉴스 리스트 요청.
     * 실시간 검색어를 순회하여 얻은 뉴스 리스트마다 중첩으로 순회하여 각 뉴스 기사 데이터 요청.
     */
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

            // 뉴스 리스트를 순회하여 각 기사의 url 수집.
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

  // Link 컴포넌트의 리디렉션 막고 useRouter 로 리디렉션. (리디렉션 전에 상태 업데이트 하기 위함)
  // news 페이지로 리디렉션 전에 keyword 업데이트.
  const onClick = (keyword: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    /* 
    실시간 검색어 클릭 시 클라이언트에서 실시간 검색어 별 뉴스 리스트 및 뉴스 기사를 디스패치 하기 전이면 
    서버에서 가져온 newsOfTopicsList 중 클릭한 타이틀과 일치하는 것으로 디스패치 
    */
    if (topics === undefined && newsOfTopicsList?.length !== 0) {
      dispatch(
        setNewsList(newsOfTopicsList?.filter((item) => item.keyword === keyword)[0] || { keyword: "", newsList: [] }),
      );

      dispatch(
        setArticles(totalArticles?.filter((item) => item.keyword === keyword)[0] || { keyword: "", articles: [] }),
      );
    }

    /* 
    실시간 검색어 클릭 시 클라이언트에서 실시간 검색어 별 리스트 및 뉴스 기사를 디스패치한 이후면
    디스패치된 리스트 및 뉴스 기사 세트 중 클릭한 타이틀과 일치하는 것으로 디스패치 
    */
    if (topics !== undefined && newsListArray !== undefined) {
      dispatch(
        setNewsList(newsListArray.filter((item) => item.keyword === keyword)[0] || { keyword: "", newsList: [] }),
      );
      dispatch(
        setArticles(storedTotalArticles.filter((item) => item.keyword === keyword)[0] || { keyword: "", articles: [] }),
      );
    }
    router.push("/news");
  };

  return (
    <div>
      <div css={css(topicsForm)}>
        <h4>실시간 검색어 Top 10</h4>
        <ul>
          {(topics || keywordsData)?.map((item, index) => {
            return (
              <Link href="/news" key={index} onClick={onClick(item.keyword)}>
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
