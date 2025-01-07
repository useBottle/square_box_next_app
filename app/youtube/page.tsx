/**@jsxImportSource @emotion/react */

"use client";

import { useEffect, useState } from "react";
import SearchBar from "../component/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setPageState } from "@/store/switches";
import Link from "next/link";
import { css } from "@emotion/react";
import Image from "next/image";
import { youtube } from "@/styles/Youtube.styles";
import YoutubeSkeleton from "../component/YoutubeSkeleton";
import FetchFailedData from "../component/FetchFailedData";
import { FaCircleArrowUp } from "react-icons/fa6";
import ScrollBtn from "../component/ScrollBtn";

export default function Youtube() {
  const dispatch = useDispatch<AppDispatch>();
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const youtubeStatus = useSelector((state: RootState) => state.youtube.youtubeStatus);

  useEffect(() => {
    // console.log(youtubeList);
    // 유튜브 페이지 접속 여부 체크 -> 검색 컴포넌트에서 검색 요청 토글 역할
    dispatch(setPageState("youtube"));

    return () => {
      dispatch(setPageState("default"));
    };
  }, [dispatch]);

  if (youtubeStatus === "loading") {
    return (
      <div>
        <SearchBar />
        <YoutubeSkeleton />
      </div>
    );
  }

  // youtubeStatus 가 failed 일 경우 FetchFailedData 렌더링
  if (youtubeStatus === "failed") {
    return <FetchFailedData />;
  }

  return (
    <div css={css(youtube)}>
      <SearchBar />
      {youtubeList.items.length === 0 && (
        <div className="initYoutube">
          <h1>영상을 검색해주세요</h1>
        </div>
      )}
      <ul>
        {youtubeList.items.map((item, index) => {
          return (
            <Link href={`/youtube/detail?id=${item.id.videoId}&index=${index}`} key={index}>
              <li>
                <Image src={item.snippet.thumbnails.high.url} alt={item.snippet.title} width={300} height={200} />
                <div className="textGroup">
                  <h1 className="title">{item.snippet.title}</h1>
                  <h4 className="channel">{item.snippet.channelTitle}</h4>
                  <div className="publishedAt">{item.snippet.publishedAt}</div>
                  <p className="description">{item.snippet.description}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
      <ScrollBtn />
    </div>
  );
}
