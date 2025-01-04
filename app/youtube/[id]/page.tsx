/**@jsxImportSource @emotion/react */

"use client";

import ExpiredData from "@/app/component/ExpiredData";
import { RootState } from "@/store/store";
import { youtubeDynamic } from "@/styles/Youtube.styles";
import { css } from "@emotion/react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YoutubeDynamic(): JSX.Element {
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const searchParams = useSearchParams();

  const videoId = searchParams.get("id");
  const index = Number(searchParams.get("index"));

  // youtubeList 가 비었을 경우 ExpiredData 렌더링
  if (youtubeList === undefined || youtubeList.items.length === 0) {
    return <ExpiredData />;
  }

  return (
    <div css={css(youtubeDynamic)}>
      <YouTube
        className="player"
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
      <div className="textGroup">
        <h1 className="title">{youtubeList.items[index].snippet.title}</h1>
        <h4 className="channel">{youtubeList.items[index].snippet.channelTitle}</h4>
        <h4 className="publishedAt">{youtubeList.items[index].snippet.publishedAt}</h4>
        <p className="description">{youtubeList.items[index].snippet.description}</p>
      </div>
    </div>
  );
}
