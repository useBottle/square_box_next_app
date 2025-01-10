/**@jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { GoBookmarkFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import ExpiredData from "@/app/component/ExpiredData";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { dynamicNewsStyles } from "@/styles/News.styles";
import Image from "next/image";
import Link from "next/link";
import { deleteNewsBookmark, findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkNewsActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ScrollBtn from "@/app/component/ScrollBtn";
import { getMarkedNews } from "@/app/actions/bookmarkActions";
import { getLatestNewsArticle } from "@/app/actions/latestNewsActions";
import { setLatestNewsArticle } from "@/store/latestNews";
import ArticleSkeleton from "@/app/component/ArticleSkeleton";

export default function LatestNewsDetail(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const params = useSearchParams();
  const newsTitle = params.get("title");
  const latestNewsUrl = useSelector((state: RootState) => state.latestNews.latestNewsUrl);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoadingMarked, setIsLoadingMarked] = useState<boolean>(true);
  const latestNewsArticle = useSelector((state: RootState) => state.latestNews.latestNewsArticle);

  // latestNewsArticle 이 업데이트 되면 해당 값이 북마크 되어있는지 확인
  useEffect(() => {
    console.log(latestNewsArticle);
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

        if (session && session.user && session.user.name !== undefined) {
          const findBookmark = await findNewsBookmark(latestNewsArticle.title, session.user.name as string);
          // console.log(findBookmark);
          if (findBookmark && findBookmark.exists === true) {
            setBookmarkSuccess(true);
          }
          setIsLoadingMarked(false);

          // 유저 세션이 없으면 함수 종료.
        } else if (!session || !session.user || session.user.name === undefined) return;
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
    if (!session || !session.user || session.user.name === undefined) return;

    // 현재 뉴스 기사 객체 생성
    const currentNews = {
      title: latestNewsArticle.title,
      date: latestNewsArticle.date,
      image: latestNewsArticle.image,
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
          return;
        }

        if (markedNewsData && (markedNewsData?.number as number) === 10) {
          alert("북마크는 10개 까지만 가능합니다.");
          return;
        }
      }
    } catch (error) {
      console.error("news bookmark failed", error);
      alert("북마크에 실패했습니다. 재시도해주세요.");
    }
  };

  // newsId 가 안맞는 경우 ExpiredData 렌더링
  if (typeof newsTitle !== "string") {
    return <ExpiredData />;
  }

  // latestNewsArticle 이 업데이트 되기 전이면 Skeleton UI 렌더링
  if (latestNewsArticle.title === "") {
    return <ArticleSkeleton />;
  }

  return (
    <article css={css(dynamicNewsStyles)}>
      <figure className="imgGroup">
        {latestNewsArticle.image === "" || !latestNewsArticle.image.startsWith("https") ? (
          <div className="noImg">No Image</div>
        ) : (
          <Image src={latestNewsArticle.image} alt="newsImg" width={200} height={200} />
        )}
        <figcaption className="alt">{latestNewsArticle.alt}</figcaption>
      </figure>
      <div className="textGroup">
        <h1>{latestNewsArticle.title}</h1>
        <div className="date">{latestNewsArticle.date}</div>
        {session ? (
          <form onSubmit={onSubmit}>
            {!isLoadingMarked && (
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
        {latestNewsArticle.text.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <ScrollBtn />
    </article>
  );
}
