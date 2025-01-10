"use client";

import { TopicsType } from "@/types/types";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setNewsListsOfTopics, setTopicsList } from "@/store/topics";

export default function FetchTopics() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    /**
     * fetchKeyword
     * 실시간 검색어를 순회하여 각 검색어에 해당하는 뉴스 리스트 요청.
     * 페이지 최초 접속 시의 실시간 검색어 및 해당하는 각 뉴스 리스트 셋은 TopicsContainer 에서 1회 초기 요청.
     * 이후 인터벌로 이곳에서 모든 데이터 업데이트.
     */
    const fetchKeyword = async () => {
      try {
        const topicsResponse = await axios.get("/api/topics");

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
            return data;
          }),
        );

        dispatch(setNewsListsOfTopics(results));
        dispatch(setTopicsList(topicsResponse.data.top10));
      } catch (error) {
        console.error("Failed fetching keyword data.", error);
      }
    };

    // topicsList, newsListOfTopics, articlesOfTopics 를 인터벌로 디스패치.
    const intervalFetch = setInterval(() => {
      fetchKeyword();
    }, 1000 * 60);

    return () => clearInterval(intervalFetch);
  }, []);

  return <></>;
}
