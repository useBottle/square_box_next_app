/**@jsxImportSource @emotion/react */

"use client";

import { findYoutubeBookmark } from "@/app/actions/bookmarkActions";
import ExpiredData from "@/app/component/ExpiredData";
import { RootState } from "@/store/store";
import { youtubeDynamic } from "@/styles/Youtube.styles";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YoutubeDynamic(): JSX.Element {
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const videoId = searchParams.get("id");
  const index = Number(searchParams.get("index"));

  // 유저 정보 및 유튜브 데이터 DB 에서 확인 후 북마크 버튼 스타일 변경 트리거 상태 변경.
  useEffect(() => {
    if (!session || !session.user || session.user.name === undefined) return;

    async function findMarkedYoutube() {
      try {
        const findBookmark = await findYoutubeBookmark(videoId as string, session?.user.name as string);
        if (findBookmark && findBookmark.exists === true) {
          setBookmarkSuccess(true);
        }
      } catch (error) {
        console.error("youtube bookmark failed", error);
      }
      setIsLoading(false);
    }
    findMarkedYoutube();
  }, []);

  // index 가 안맞거나 youtubeList 가 비었을 경우 ExpiredData 렌더링
  if (
    typeof index !== "number" ||
    index < 0 ||
    index >= youtubeList.items.length ||
    youtubeList.items.length === 0 ||
    youtubeList === undefined
  ) {
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
