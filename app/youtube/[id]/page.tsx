/**@jsxImportSource @emotion/react */

"use client";

import { getMarkedYoutube } from "@/app/actions/bookmarkActions";
import { deleteYoutubeBookmark, findYoutubeBookmark, setYoutubeBookmark } from "@/app/actions/bookmarkYoutubeActions";
import BookmarkBtn from "@/app/component/BookmarkBtn";
import ExpiredData from "@/app/component/ExpiredData";
import { setMarkedYoutube } from "@/store/bookmark";
import { AppDispatch, RootState } from "@/store/store";
import { setPageState } from "@/store/switches";
import { youtubeDynamic } from "@/styles/Youtube.styles";
import { currentYoutubeVideo } from "@/types/types";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YoutubeDynamic(): JSX.Element {
  const youtubeList = useSelector((state: RootState) => state.youtube.youtubeList);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageState = useSelector((state: RootState) => state.switches.pageState);
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);

  const videoId = searchParams.get("id");
  const index = Number(searchParams.get("index"));

  useEffect(() => {
    dispatch(setPageState("youtube"));

    // 유저 정보가 없으면 북마크 데이터 확인하지 않음
    if (!session || !session.user || !session.user.name) return;

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
    if (!session || !session.user || !session.user.name) return;

    // 현재 유튜브 영상 객체 생성
    const currentVideo = {
      videoId: youtubeList.items[index].id.videoId,
      title: youtubeList.items[index].snippet.title,
      channelTitle: youtubeList.items[index].snippet.channelTitle,
      publishedAt: youtubeList.items[index].snippet.publishedAt,
      description: youtubeList.items[index].snippet.description,
      thumbnail: youtubeList.items[index].snippet.thumbnails.high.url,
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
        // 유저와 일치하는 북마크 유튜브 데이터 모두 검색
        const markedYoutubeData = await getMarkedYoutube(session.user.name as string);

        // 북마크 수 10개 미만일 경우만 북마크 요청
        if (markedYoutubeData && (markedYoutubeData?.number as number) < 10) {
          const response = await setYoutubeBookmark(currentVideo as currentYoutubeVideo, session.user.name);
          response && response.success === true && setBookmarkSuccess(true);
          // console.log(response);
        }

        if (markedYoutubeData && (markedYoutubeData?.number as number) === 10) {
          alert("북마크는 10개 까지만 가능합니다.");
          return;
        }
      }

      // 북마크된 최신 상태로 디스패치
      const afterProcessYoutube = await getMarkedYoutube(session.user.name as string);
      afterProcessYoutube &&
        afterProcessYoutube.exists !== undefined &&
        afterProcessYoutube.number !== undefined &&
        dispatch(
          setMarkedYoutube({
            exists: afterProcessYoutube.exists,
            number: afterProcessYoutube.number,
            data: afterProcessYoutube.data,
          }),
        );
    } catch (error) {
      console.error("youtube bookmark failed", error);
      alert("북마크에 실패했습니다. 재시도해주세요.");
    }
  };

  // index 타입 불이치 또는 youtubeList 가 비었을 경우 또는 pageState가 초기화된 경우 ExpiredData 렌더링
  if (
    typeof index !== "number" ||
    index < 0 ||
    index >= youtubeList.items.length ||
    youtubeList.items.length === 0 ||
    youtubeList === undefined ||
    pageState === "default"
  ) {
    return <ExpiredData />;
  }

  return (
    <div css={css(youtubeDynamic)}>
      {!navMenu && (
        <div className="youtubeDetailWrapper">
          <YouTube
            videoId={videoId}
            key={videoId}
            opts={{
              width: "100%",
              height: "250",
              playerVars: {
                autoplay: 0, // 자동재생 off
                rel: 0, // 관련 동영상 표시 x
                modestbranding: 0, // 컨트롤 바에 youtube 로고 표시 x
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
            <form onSubmit={onSubmit}>{<BookmarkBtn success={bookmarkSuccess} isLoading={isLoading} />}</form>
            <p className="description">{youtubeList.items[index].snippet.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
