/**@jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import ExpiredData from "@/app/component/ExpiredData";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { dynamicNewsStyles } from "@/styles/News.styles";
import Image from "next/image";
import { deleteNewsBookmark, findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkNewsActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ScrollBtn from "@/app/component/ScrollBtn";
import { getMarkedNews } from "@/app/actions/bookmarkActions";
import { getLatestNewsArticle } from "@/app/actions/latestNewsActions";
import { setLatestNewsArticle } from "@/store/latestNews";
import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import BookmarkBtn from "@/app/component/BookmarkBtn";
import { setMarkedNews } from "@/store/bookmark";

export default function LatestNewsDetail(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const params = useSearchParams();
  const newsTitle = params.get("title");
  const latestNewsUrl = useSelector((state: RootState) => state.latestNews.latestNewsUrl);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoadingMarked, setIsLoadingMarked] = useState<boolean>(true);
  const latestNewsArticle = useSelector((state: RootState) => state.latestNews.latestNewsArticle);
  const pageState = useSelector((state: RootState) => state.switches.pageState);

  // latestNewsArticle 이 업데이트 되면 해당 값이 북마크 되어있는지 확인
  useEffect(() => {
    window.scrollTo({ top: 0 });

    // 클릭한 뉴스에 대한 article 데이터 요청
    if (latestNewsArticle.title === "" || latestNewsArticle.title !== newsTitle) {
      const fetchArticle = async () => {
        const result = await getLatestNewsArticle(latestNewsUrl);
        dispatch(setLatestNewsArticle(result));
      };
      fetchArticle();
    }

    // 유저 정보 및 뉴스 데이터 DB에서 확인 후 북마크 버튼 스타일 변경 트리거 상태 변경.
    const findMarkedNews = async () => {
      try {
        // 상태 업데이트가 완료되지 않아 데이터가 비었을 경우 함수 종료.
        if (latestNewsArticle.title === "") return;

        if (session && session.user && session.user.name) {
          const findBookmark = await findNewsBookmark(latestNewsArticle.title, session.user.name as string);
          // console.log(findBookmark);
          if (findBookmark && findBookmark.exists === true) {
            setBookmarkSuccess(true);
          }
          setIsLoadingMarked(false);

          // 유저 세션이 없으면 함수 종료.
        } else if (!session || !session.user || !session.user.name) return;
      } catch (error) {
        console.error("news bookmark failed", error);
      }
    };
    findMarkedNews();
  }, [latestNewsArticle]);

  // 북마크 onSubmit 요청
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || !session.user.name) return;

    // 현재 뉴스 기사 객체 생성
    const currentNews = {
      title: latestNewsArticle.title,
      date: latestNewsArticle.date,
      image:
        latestNewsArticle.image.endsWith(".jpg") ||
        latestNewsArticle.image.endsWith(".jpeg") ||
        latestNewsArticle.image.endsWith(".png") ||
        latestNewsArticle.image.endsWith(".gif") ||
        latestNewsArticle.image.endsWith(".svg") ||
        latestNewsArticle.image.endsWith(".webp")
          ? latestNewsArticle.image
          : "",
      alt: latestNewsArticle.alt,
      text: latestNewsArticle.text,
    };

    try {
      if (latestNewsArticle.title === "") return;
      const findBookmark = await findNewsBookmark(latestNewsArticle.title, session.user.name);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          const response = await deleteNewsBookmark(currentNews, session.user.name);
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
        const markedNewsData = await getMarkedNews(session.user.name as string);

        // 북마크 수 10개 미만일 경우만 북마크 요청
        if (markedNewsData && (markedNewsData?.number as number) < 10) {
          const response = await setNewsBookmark(currentNews, session.user.name);
          response && response.success === true && setBookmarkSuccess(true);
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
      alert("북마크에 실패했습니다. 재시도해주세요.");
    }
  };

  // newsTitle 타입 불일치 또는 pageState 가 초기화된 경우 ExpiredData 렌더링
  if (typeof newsTitle !== "string" || pageState === "default") {
    return <ExpiredData />;
  }

  // latestNewsArticle 이 업데이트 되기 전이면 Skeleton UI 렌더링
  if (latestNewsArticle.title === "") {
    return <ArticleSkeleton />;
  }

  return (
    <article css={css(dynamicNewsStyles)}>
      <figure className="imgGroup">
        {latestNewsArticle.image === "" ? (
          <div className="noImg">No Image</div>
        ) : (
          <Image src={latestNewsArticle.image} alt="newsImg" width={200} height={200} />
        )}
        <figcaption className="alt">{latestNewsArticle.alt}</figcaption>
      </figure>
      <div className="textGroup">
        <h1>{latestNewsArticle.title}</h1>
        <div className="date">{latestNewsArticle.date}</div>
        <form onSubmit={onSubmit}>{<BookmarkBtn success={bookmarkSuccess} isLoading={isLoadingMarked} />}</form>
        {latestNewsArticle.text.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <ScrollBtn />
    </article>
  );
}
