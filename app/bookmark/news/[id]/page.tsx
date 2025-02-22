/**@jsxImportSource @emotion/react */

"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import { dynamicNewsStyles } from "@/styles/News.styles";
import Image from "next/image";
import BookmarkBtn from "@/app/component/BookmarkBtn";
import ScrollBtn from "@/app/component/ScrollBtn";
import { findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkNewsActions";
import { deleteNewsBookmark, getMarkedNews } from "@/app/actions/bookmarkActions";
import { setMarkedNews } from "@/store/bookmark";
import { setPageState } from "@/store/switches";
import ExpiredData from "@/app/component/ExpiredData";
import ArticleSkeleton from "@/app/component/ArticleSkeleton";

export default function MarkedNewsDynamic(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useSearchParams();
  const newsTitle = params.get("title") as string;
  const { data: session } = useSession();
  const clickedNews = useSelector((state: RootState) => state.bookmark.clickedNews);
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
      const findBookmark = await findNewsBookmark(clickedNews.title, session.user.name as string);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          setBookmarkSuccess(false);
          const response = await deleteNewsBookmark(clickedNews._id, session.user.name as string);
          response && response.delete === false && setBookmarkSuccess(true);
        } else {
          return;
        }
      }

      // 북마크된 데이터 없을 경우 북마크 시도
      if (findBookmark && findBookmark.exists === false) {
        // 유저와 일치하는 북마크 뉴스 데이터 모두 검색
        const markedNewsData = await getMarkedNews(session.user.name as string);

        // 북마크 수 10개 미만일 경우만 북마크 요청
        if (markedNewsData && (markedNewsData?.number as number) < 10) {
          setBookmarkSuccess(true);
          const response = await setNewsBookmark(clickedNews, session.user.name);
          response && response.success === false && setBookmarkSuccess(false);
          // console.log(response);
        }

        if (markedNewsData && (markedNewsData?.number as number) === 10) {
          alert("북마크는 10개 까지만 가능합니다.");
          return;
        }
      }

      // 북마크된 최신 상태로 디스패치
      const afterProcessNews = await getMarkedNews(session.user.name as string);
      afterProcessNews &&
        afterProcessNews.exists !== undefined &&
        afterProcessNews.number !== undefined &&
        dispatch(
          setMarkedNews({
            exists: afterProcessNews.exists,
            number: afterProcessNews.number,
            data: afterProcessNews.data,
          }),
        );
    } catch (error) {
      console.error("news bookmark failed", error);
    }
  };

  // newsTitle 타입 불일치 또는 pageState 가 초기화된 경우 ExpiredData 렌더링
  if (typeof newsTitle !== "string" || pageState === "default") {
    return <ExpiredData />;
  }

  // clickedNews 가 업데이트 되기 전이면 Skeleton UI 렌더링
  if (clickedNews.title === "") {
    return <ArticleSkeleton />;
  }

  return (
    <article css={css(dynamicNewsStyles)}>
      {!navMenu && (
        <div className="newsDetailWrapper">
          <figure className="imgGroup">
            {clickedNews.image === "" ? (
              <div className="noImg">No Image</div>
            ) : (
              <Image src={clickedNews.image} alt="newsImg" width={200} height={200} className="newsImg" />
            )}
            <figcaption className="alt">{clickedNews.alt}</figcaption>
          </figure>
          <div className="textGroup">
            <h1>{clickedNews.title}</h1>
            <div className="container">
              <div className="date">{clickedNews.date}</div>
              <form onSubmit={onSubmit}>
                <BookmarkBtn success={bookmarkSuccess} isLoading={false} />
              </form>
            </div>
            {clickedNews.text.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
          <ScrollBtn />
        </div>
      )}
    </article>
  );
}
