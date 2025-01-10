"use client";

import { articleData, newsList, TopicsType } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { setTotalArticles } from "@/store/news";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

export default function FetchTopics() {
  const dispatch = useDispatch<AppDispatch>();

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
        // setNewsListArray(results); -> 슬라이스 생성 후 디스패치하기
        // setTopics(topicsResponse.data.top10); -> 슬라이스 생성 후 디스패치하기
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

  return <></>;
}
