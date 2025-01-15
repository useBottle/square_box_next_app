/**@jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { youtubeDynamic } from "@/styles/Youtube.styles";
import YouTube, { YouTubeEvent } from "react-youtube";
import BookmarkBtn from "@/app/component/BookmarkBtn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { setPageState } from "@/store/switches";
import { findYoutubeBookmark, setYoutubeBookmark } from "@/app/actions/bookmarkYoutubeActions";
import { deleteYoutubeBookmark, getMarkedYoutube } from "@/app/actions/bookmarkActions";
import { setMarkedYoutube } from "@/store/bookmark";
import ExpiredData from "@/app/component/ExpiredData";

export default function MarkedYoutubeDynamic(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useSearchParams();
  const videoId = params.get("videoId") as string;
  const { data: session } = useSession();
  const clickedYoutube = useSelector((state: RootState) => state.bookmark.clickedYoutube);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(true);
  const pageState = useSelector((state: RootState) => state.switches.pageState);
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);

  useEffect(() => {
    (!session || !session.user || !session.user.name) && router.push("/auth/signin");
    dispatch(setPageState("detail"));

    window.scrollTo({ top: 0 });
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || session.user.name === undefined) return;

    try {
      const findBookmark = await findYoutubeBookmark(clickedYoutube.videoId, session.user.name as string);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          const response = await deleteYoutubeBookmark(clickedYoutube._id, session.user.name as string);
          if (response && response.delete === true) {
            setBookmarkSuccess(false);
          }
        } else {
          return;
        }
      }

      // 북마크된 데이터 없을 경우 북마크 시도
      if (findBookmark && findBookmark.exists === false) {
        // 유저와 일치하는 북마크 뉴스 데이터 모두 검색
        const markedYoutubeData = await getMarkedYoutube(session.user.name as string);

        // 북마크 수 10개 미만일 경우만 북마크 요청
        if (markedYoutubeData && (markedYoutubeData?.number as number) < 10) {
          const response = await setYoutubeBookmark(clickedYoutube, session.user.name);
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
    }
  };

  // videoId 타입 불일치 또는 pageState 가 초기화된 경우 ExpiredData 렌더링
  if (typeof videoId !== "string" || pageState === "default") {
    return <ExpiredData />;
  }

  return (
    <div css={css(youtubeDynamic)}>
      {!navMenu && (
        <div className="bookmarkYoutubeDetailWrapper">
          <YouTube
            className="player"
            videoId={clickedYoutube.videoId}
            key={clickedYoutube.videoId}
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
            <h1 className="title">{clickedYoutube.title}</h1>
            <h4 className="channel">{clickedYoutube.channelTitle}</h4>
            <div className="publishedAt">{clickedYoutube.publishedAt}</div>
            <form onSubmit={onSubmit}>{<BookmarkBtn success={bookmarkSuccess} isLoading={false} />}</form>
            <p className="description">{clickedYoutube.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
