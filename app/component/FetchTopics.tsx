"use client";

import { articleData, newsList, TopicsType } from "@/types/types";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setNewsListOfTopics, setTopicsList, setTotalArticles } from "@/store/topics";

export default function FetchTopics() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    /**
     * fetchKeyword
     * 실시간 검색어를 순회하여 각 검색어에 해당하는 뉴스 리스트 요청.
     * 실시간 검색어를 순회하여 얻은 뉴스 리스트마다 중첩으로 순회하여 각 뉴스 기사 데이터 요청.
     * 페이지 최초 접속 시의 실시간 검색어 및 해당하는 각 뉴스 리스트 셋은 TopicsContainer 에서 1회 초기 요청.
     * 페이지 최초 접속 시의 실시간 검색에 따른 각 뉴스 리스트별로 모든 뉴스 기사 데이터 (totalArticles) 는 이곳에서 최초 요청.
     * 이후 인터벌로 이곳에서 모든 데이터 업데이트.
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

        const resultData = {
          newsListOfTopics: results,
          topicsList: topicsResponse.data.top10,
          totalArticles: articlesOfTopics,
        };

        return resultData;

        // dispatch(setNewsListOfTopics(results));
        // dispatch(setTopicsList(topicsResponse.data.top10));
        // dispatch(setTotalArticles(articlesOfTopics));
      } catch (error) {
        console.error("Failed fetching keyword data.", error);
      }
    };

    // 최초 topics, newsListOfTopics 를 클라이언트에서 받아와 사용하려면 이곳에서 디스패치.
    const dispatchData = async () => {
      const result = await fetchKeyword();
      result?.totalArticles && dispatch(setTotalArticles(result.totalArticles));
    };

    dispatchData();

    // topicsList, newsListOfTopics, totalArticles 를 인터벌로 디스패치.
    const intervalFetch = setInterval(async () => {
      const result = await fetchKeyword();
      result?.topicsList && dispatch(setTopicsList(result.topicsList));
      result?.newsListOfTopics && dispatch(setNewsListOfTopics(result.newsListOfTopics));
      result?.totalArticles && dispatch(setTotalArticles(result.totalArticles));
    }, 1000 * 60);

    return () => clearInterval(intervalFetch);
  }, []);

  return <></>;
}
