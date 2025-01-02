/**@jsxImportSource @emotion/react */

"use client";

import { RootState } from "@/store/store";
import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YoutubeDynamic(): JSX.Element {
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const searchParams = useSearchParams();

  const videoId = searchParams.get("id");
  const index = Number(searchParams.get("index"));

  const infoText: CSSObject = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "80vh",
    fontSize: "1.6rem",

    "& a": {
      color: "var(--reverse-font)",
      padding: "1rem 2rem",
      background: "var(--basic-font)",
      borderRadius: "3px",
      marginTop: "8rem",
    },
  };

  if (!youtubeList || youtubeList.items.length === 0) {
    return (
      <div css={css(infoText)}>
        <p>데이터가 만료되었습니다</p>
        <p>다시 시도해주세요</p>
        <Link href="/">HOME</Link>
      </div>
    );
  }

  return (
    <div>
      <YouTube
        videoId={videoId}
        key={videoId}
        opts={{
          width: "100%",
          height: "250",
          playerVars: {
            autoplay: 0, // 자동재생 O
            rel: 0, // 관련 동영상 표시하지 않음
            modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
          },
        }}
        onEnd={(e: YouTubeEvent) => {
          e.target.stopVideo(0);
        }}
      />
      <h1>{youtubeList.items[index].snippet.title}</h1>
      <div className="textGroup">
        <h1 className="title">{youtubeList.items[index].snippet.title}</h1>
        <h4 className="channel">{youtubeList.items[index].snippet.channelTitle}</h4>
        <h4 className="publishedAt">{youtubeList.items[index].snippet.publishedAt}</h4>
        <p className="description">{youtubeList.items[index].snippet.description}</p>
      </div>
    </div>
  );
}
