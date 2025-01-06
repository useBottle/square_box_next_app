/**@jsxImportSource @emotion/react */

"use client";

import { deleteYoutubeBookmark, findYoutubeBookmark, setYoutubeBookmark } from "@/app/actions/bookmarkActions";
import ExpiredData from "@/app/component/ExpiredData";
import { RootState } from "@/store/store";
import { youtubeDynamic } from "@/styles/Youtube.styles";
import { currentYoutubeVideo, MarkedYoutubeVideo } from "@/types/types";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GoBookmarkFill } from "react-icons/go";
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

  useEffect(() => {
    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || session.user.name === undefined) return;

    // 유저 정보 및 유튜브 데이터 DB 에서 확인 후 북마크 버튼 스타일 변경 트리거 상태 변경.
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

  // 북마크 onSubmit 요청
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || session.user.name === undefined) return;

    // 현재 유튜브 영상 객체 생성
    const currentVideo = {
      videoId: youtubeList.items[index].id.videoId,
      title: youtubeList.items[index].snippet.title,
      channelTitle: youtubeList.items[index].snippet.channelTitle,
      publishedAt: youtubeList.items[index].snippet.publishedAt,
      description: youtubeList.items[index].snippet.description,
      thumbnails: youtubeList.items[index].snippet.thumbnails.high.url,
    };

    try {
      const findBookmark = await findYoutubeBookmark(videoId as string, session.user.name);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          const response = await deleteYoutubeBookmark(videoId as string, session.user.name);

          if (response && response.delete === true) {
            setBookmarkSuccess(false);
          } else {
            return;
          }
        }
      }

      // 북마크된 데이터 없을 경우 북마크 시도
      if (findBookmark && findBookmark.exists === false) {
        const response = await setYoutubeBookmark(currentVideo as currentYoutubeVideo, session.user.name);
        response && response.success === true && setBookmarkSuccess(true);
        // console.log(response);
        return;
      }
    } catch (error) {
      console.error("youtube bookmark failed", error);
      alert("북마크에 실패했습니다. 재시도해주세요.");
    }
  };

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
        <div className="publishedAt">{youtubeList.items[index].snippet.publishedAt}</div>
        {session ? (
          <form onSubmit={onSubmit}>
            {!isLoading && (
              <button
                type="submit"
                style={
                  bookmarkSuccess
                    ? {
                        background: "var(--basic-font)",
                        border: "var(--basic-font) solid 1px",
                        color: "var(--reverse-font)",
                      }
                    : {}
                }
              >
                {bookmarkSuccess ? <FaCheck /> : <GoBookmarkFill />}
              </button>
            )}
          </form>
        ) : (
          <Link href="/auth/signin">
            <button>
              <span>북마크하려면 로그인 해야합니다</span>
            </button>
          </Link>
        )}
        <p className="description">{youtubeList.items[index].snippet.description}</p>
      </div>
    </div>
  );
}
