/**@jsxImportSource @emotion/react */

"use client";

import { useEffect } from "react";
import SearchBar from "../component/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setInputValue, setPageState } from "@/store/switches";
import Link from "next/link";
import { css } from "@emotion/react";
import Image from "next/image";
import { youtube } from "@/styles/Youtube.styles";
import YoutubeSkeleton from "../component/YoutubeSkeleton";
import FetchFailedData from "../component/FetchFailedData";
import ScrollBtn from "../component/ScrollBtn";
import { PiInfoFill, PiWarningCircleFill } from "react-icons/pi";
import { PiFilmSlateLight } from "react-icons/pi";
import { TbBoxOff } from "react-icons/tb";
import ExpiredData from "../component/ExpiredData";

export default function Youtube() {
  const dispatch = useDispatch<AppDispatch>();
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const youtubeStatus = useSelector((state: RootState) => state.youtube.youtubeStatus);
  const inputValue = useSelector((state: RootState) => state.switches.inputValue);
  const pageState = useSelector((state: RootState) => state.switches.pageState);

  useEffect(() => {
    // console.log(youtubeList);
    // 유튜브 페이지 접속 여부 체크 -> 검색 컴포넌트에서 검색 요청 토글 역할
    dispatch(setPageState("youtube"));
    dispatch(setInputValue(""));

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

  // pageState 가 초기화된 경우 ExpiredData 렌더링
  if (pageState === "default") {
    return <ExpiredData />;
  }

  return (
    <div css={css(youtube)}>
      <SearchBar />
      {youtubeList.items.length === 0 && inputValue === "" && (
        <div className="initYoutube">
          <PiInfoFill className="icon" />
          <div className="textNback">
            <h1>영상을 검색해주세요</h1>
            <PiFilmSlateLight className="backIcon" />
          </div>
        </div>
      )}
      {youtubeList.items.length === 0 && inputValue !== "" && (
        <div className="initYoutube">
          <PiWarningCircleFill className="icon" />
          <div className="textNback">
            <h1>검색된 영상이 없습니다</h1>
            <TbBoxOff className="backIcon" />
          </div>
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
