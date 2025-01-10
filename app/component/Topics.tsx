/** @jsxImportSource @emotion/react */

"use client";

import { topicsForm } from "@/styles/Topics.styles";
import { TopicsProps } from "@/types/types";
import { css } from "@emotion/react";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Link from "next/link";
import { setArticles, setNewsList } from "@/store/news";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { setInputValue } from "@/store/switches";

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
  const topicsList = useSelector((state: RootState) => state.topics.topicsList);
  const newsListOfTopics = useSelector((state: RootState) => state.topics.newsListOfTopics);
  const storedTotalArticles = useSelector((state: RootState) => state.news.totalArticles);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { newsOfTopicsList, keywordsData, totalArticles } = data;

  // Link 컴포넌트의 리디렉션 막고 useRouter 로 리디렉션. (리디렉션 전에 상태 업데이트 하기 위함)
  // news 페이지로 리디렉션 전에 keyword 업데이트.
  const onClick = (keyword: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    /* 
    실시간 검색어 클릭 시 클라이언트에서 실시간 검색어 별 뉴스 리스트 및 뉴스 기사를 디스패치 하기 전이면 
    서버에서 가져온 newsOfTopicsList 중 클릭한 타이틀과 일치하는 것으로 디스패치 
    */
    if (topicsList === undefined && newsOfTopicsList !== undefined) {
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
    if (topicsList && newsListOfTopics) {
      dispatch(
        setNewsList(newsListOfTopics.filter((item) => item.keyword === keyword)[0] || { keyword: "", newsList: [] }),
      );
      dispatch(
        setArticles(storedTotalArticles.filter((item) => item.keyword === keyword)[0] || { keyword: "", articles: [] }),
      );
    }

    dispatch(setInputValue(keyword));
    router.push("/news");
  };

  return (
    <div>
      <div css={css(topicsForm)}>
        <h4>실시간 검색어 Top 10</h4>
        <ul>
          {(topicsList || keywordsData)?.map((item, index) => {
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
