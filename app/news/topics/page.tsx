/** @jsxImportSource @emotion/react */

"use client";

import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../component/SearchBar";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { newsListStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { setPageState } from "@/store/switches";
import FetchFailedData from "../../component/FetchFailedData";
import { PiWarningCircleFill, PiInfoFill } from "react-icons/pi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TbBoxOff } from "react-icons/tb";
import { setSingleArticle } from "@/store/news";
import { useRouter } from "next/navigation";

export default function News(): JSX.Element {
  const newsListOfSingleTopic = useSelector((state: RootState) => state.topics.newsListOfSingleTopic);
  const keyword = useSelector((state: RootState) => state.news.newsList.keyword);
  const articlesOfTopics = useSelector((state: RootState) => state.topics.articlesOfTopics);
  const [noNewsList, setNoNewsList] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // 뉴스 페이지 접속 여부 체크 -> 검색 컴포넌트에서 검색 요청 토글 역할
  useEffect(() => {
    dispatch(setPageState("news"));
    return () => {
      dispatch(setPageState("default"));
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("news list: ", newsListOfSingleTopic);
    // 검색어가 입력되어 있고 뉴스 리스트가 없을 때, noNewsList 상태 업데이트
    if (keyword !== "" && newsListOfSingleTopic.newsList.length === 0) {
      setNoNewsList(true);
    }
  }, [keyword, newsListOfSingleTopic]);

  // 뉴스 리스트 요소를 클릭하면 articles 중 title 과 일치하는 것으로 singleArticle 에 디스패치
  const onClick = (keyword: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const articlesOfKeyword = articlesOfTopics?.find((item) => item.keyword === keyword);
    const article = articlesOfKeyword?.articles.find((item) => item.title === keyword);
    console.log("articlesOfKeyword: ", articlesOfKeyword);
    console.log("article: ", article);
    article && dispatch(setSingleArticle(article));
    router.push(`/news/detail?title=${encodeURIComponent(keyword)}`);
  };

  return (
    <div css={css(newsListStyles)}>
      <SearchBar />
      {newsListOfSingleTopic.newsList.length === 0 && !noNewsList && (
        <div className="initNews">
          <PiInfoFill className="icon" />
          <div className="textNback">
            <h1>뉴스를 검색해주세요</h1>
            <AiOutlineFileSearch className="backIcon" />
          </div>
        </div>
      )}
      {noNewsList && (
        <div className="initNews">
          <PiWarningCircleFill className="icon" />
          <div className="textNback">
            <h1>검색된 뉴스가 없습니다</h1>
            <TbBoxOff className="backIcon" />
          </div>
        </div>
      )}
      <ul>
        {newsListOfSingleTopic.newsList.map((item, index) => {
          return (
            <Link
              href={`/news/detail?title=${encodeURIComponent(item.title)}`}
              key={index}
              onClick={onClick(item.title)}
            >
              <li>
                {!(item.prevImg.startsWith("https") || item.prevImg.startsWith("http")) ? (
                  <div className="noImg">No Image</div>
                ) : (
                  <Image src={item.prevImg} alt="newsImg" width={100} height={100} />
                )}
                <div className="textGroup">
                  <h6>{item.title}</h6>
                  <div className="date">{item.date}</div>
                  <p>{item.summary}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
