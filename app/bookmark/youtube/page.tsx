/**@jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ScrollBtn from "@/app/component/ScrollBtn";
import BookmarkDeleteBtn from "@/app/component/BookmarkDeleteBtn";
import { useSession } from "next-auth/react";
import { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { bookmarkYoutube } from "@/styles/BookmarkYoutube.styles";
import { setClickedYoutube } from "@/store/bookmark";
import { setPageState } from "@/store/switches";
import ExpiredData from "@/app/component/ExpiredData";

export default function BookmarkYoutube(): JSX.Element {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const markedYoutubeData = useSelector((state: RootState) => state.bookmark.markedYoutube.data);
  const pageState = useSelector((state: RootState) => state.switches.pageState);
  const navMenu = useSelector((state: RootState) => state.switches.navMenu);

  useEffect(() => {
    (!session || !session.user || !session.user.name) && router.push("/auth/signin");
    dispatch(setPageState("bookmark"));
  }, []);

  const onClick = (id: string, videoId: string) => (e: MouseEvent) => {
    e.preventDefault();
    const clickedYoutube = markedYoutubeData.find((item) => item._id === id);
    if (clickedYoutube) {
      dispatch(setClickedYoutube(clickedYoutube));
    }
    router.push(`/bookmark/youtube/detail?videoId=${encodeURIComponent(videoId)}`);
  };

  // pageState 가 초기화된 경우 ExpiredData 렌더링
  if (pageState === "default") {
    return <ExpiredData />;
  }

  return (
    <div css={css(bookmarkYoutube)}>
      {!navMenu && (
        <section className="youtubeContainer">
          <h4 className="bookmarkSub">
            북마크 유튜브 컨텐츠<span>{`${markedYoutubeData && markedYoutubeData.length} / 10`}</span>
          </h4>
          <div className="contents">
            {markedYoutubeData && markedYoutubeData.length !== 0 ? (
              <ul>
                {markedYoutubeData.map((item, index) => {
                  return (
                    <div key={index} className="listWrapper">
                      <Link
                        href={`/youtube/detail?id=${item.videoId}&index=${index}`}
                        onClick={onClick(item._id, item.videoId)}
                        className={`youtubeLink ${/Mobi/i.test(navigator.userAgent) ? "noHover" : ""}`}
                      >
                        <li>
                          <Image src={item.thumbnail} alt={item.title} width={300} height={200} />
                          <div className="textGroup">
                            <h1 className="title">{item.title}</h1>
                            <h4 className="channel">{item.channelTitle}</h4>
                            <div className="container">
                              <div className="publishedAt">{item.publishedAt}</div>
                              <div className="deleteBtn">
                                <BookmarkDeleteBtn data={{ category: "youtube", id: item._id }} />
                              </div>
                            </div>
                          </div>
                        </li>
                      </Link>
                      <div className="mobileDeleteBtn">
                        <BookmarkDeleteBtn data={{ category: "youtube", id: item._id }} />
                      </div>
                    </div>
                  );
                })}
                <ScrollBtn />
              </ul>
            ) : (
              <div className="emptyContents">
                <p>북마크한 영상이 없습니다</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
