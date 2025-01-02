/**@jsxImportSource @emotion/react */

"use client";

import { useEffect } from "react";
import SearchBar from "../component/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setPageState } from "@/store/switches";
import Link from "next/link";
import { css, CSSObject } from "@emotion/react";

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
        <div>Youtube Skeleton 추가하기</div>
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

  return (
    <div>
      <SearchBar />
      {youtubeList.items.length === 0 && (
        <div css={css(initYoutube)}>
          <h1>영상을 검색해주세요</h1>
        </div>
      )}
      <ul>
        {youtubeList.items.map((item, index) => {
          return <Link href={""} key={index}></Link>;
        })}
      </ul>
    </div>
  );
}
