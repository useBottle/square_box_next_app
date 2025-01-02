/**@jsxImportSource @emotion/react */

"use client";

import { useEffect } from "react";
import SearchBar from "../component/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setPageState } from "@/store/switches";
import Link from "next/link";
import { css, CSSObject } from "@emotion/react";
import Image from "next/image";
import { youtube } from "@/styles/Youtube.styles";
import { trusted } from "mongoose";
import YoutubeSkeleton from "../component/YoutubeSkeleton";

export default function Youtube() {
  const dispatch = useDispatch<AppDispatch>();
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const youtubeStatus = useSelector((state: RootState) => state.youtube.youtubeStatus);

  // 유튜브 페이지 접속 여부 체크 -> 검색 컴포넌트에서 검색 요청 토글 역할
  useEffect(() => {
    dispatch(setPageState("youtube"));
    console.log(youtubeList);
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

  const initYoutube: CSSObject = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",

    "& h1": {
      fontSize: "1.6rem",
    },
  };

  // HTML Entity Decode
  function decodeHtmlEntities(text: string): string {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, "text/html").documentElement.textContent;
    return decodedString || text;
  }

  // 날짜 변환 함수
  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <SearchBar />
      {youtubeList.items.length === 0 && (
        <div css={css(initYoutube)}>
          <h1>영상을 검색해주세요</h1>
        </div>
      )}
      <ul css={css(youtube)}>
        {youtubeList.items.map((item, index) => {
          return (
            <Link href={`/youtube/detail?id=${item.id.videoId}&index=${index}`} key={index}>
              <li>
                <Image src={item.snippet.thumbnails.high.url} alt={item.snippet.title} width={300} height={200} />
                <div className="textGroup">
                  <h1 className="title">{decodeHtmlEntities(item.snippet.title)}</h1>
                  <h4 className="channel">{item.snippet.channelTitle}</h4>
                  <h4 className="publishedAt">{formatDate(item.snippet.publishedAt)}</h4>
                  <p className="description">{decodeHtmlEntities(item.snippet.description)}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
