/**@jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { getNewsArticle } from "@/app/actions/newsActions";
import { getLatestArticle } from "@/app/actions/latestNewsActions";
import { GoBookmarkFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import ExpiredData from "@/app/component/ExpiredData";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { deleteNewsBookmark, findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkActions";
import { currentArticle } from "@/types/types";
import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import { dynamicNewsStyles } from "@/styles/News.styles";
import Image from "next/image";
import Link from "next/link";

export default function LatestNewsDetail() {
  const { data: session } = useSession();
  const params = useParams();
  const newsId = Number(params.id);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoadingMarked, setIsLoadingMarked] = useState<boolean>(true);
  const [isLoadingArticle, setIsLoadingArticle] = useState<boolean>(true);
  const [currentArticle, setCurrentArticle] = useState<currentArticle>({
    title: "",
    date: "",
    image: "",
    alt: "",
    text: [],
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const getArticle = async () => {
      let result: currentArticle | undefined;

      try {
        setIsLoadingArticle(true);

        // 서버 액션에 캐시된 최신 뉴스 단일 기사 요청 후 없으면 별도로 직접 개별 요청
        const article = await getNewsArticle(newsId);
        console.log("cached article: ", article);
        result = article;

        if (result === undefined) {
          result = (await getLatestArticle(newsId)) || undefined;
        }
        setCurrentArticle(result as currentArticle);
        setIsLoadingArticle(false);
      } catch (error) {
        console.error("latest news article fetch failed", error);
      }
    };
    getArticle();
  }, []);

  // currentArticle 이 업데이트 되면 해당 값이 북마크 되어있는지 확인
  useEffect(() => {
    // 유저 정보 및 뉴스 데이터 DB 에서 확인 후 북마크 버튼 스타일 변경 트리거 상태 변경.
    const findMarkedNews = async () => {
      try {
        if (session && session.user && session.user.name !== undefined) {
          console.log("session.user.name: ", session.user.name);

          const findBookmark = await findNewsBookmark(currentArticle.title, session.user.name as string);

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
  }, [currentArticle]);

  // 북마크 onSubmit 요청
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentNews = {
      title: currentArticle.title,
      date: currentArticle.date[1] ? currentArticle.date[1] : currentArticle.date[0],
      image: currentArticle.image,
      alt: currentArticle.alt,
      text: currentArticle.text,
      username: session?.user.name,
    };

    if (!session || !session.user || session.user.name === undefined) return;

    try {
      if (currentArticle === undefined) return;
      const findBookmark = await findNewsBookmark(currentArticle.title, session.user.name);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하겠습니까?")) {
          const response = await deleteNewsBookmark(currentNews.title, currentNews.username as string);
          if (response && response.delete === true) {
            setBookmarkSuccess(false);
          }
        } else {
          return;
        }
      }

      // 북마크된 데이터 없을 경우 북마크 시도
      if (findBookmark && findBookmark.exists === false) {
        const response = await setNewsBookmark(currentNews, session.user.name);
        response && response.success === true && setBookmarkSuccess(true);
        // console.log(response);
        return;
      }
    } catch (error) {
      console.error("news bookmark failed", error);
      alert("북마크에 실패했습니다. 재시도해주세요.");
    }
  };

  // newsId 가 안맞거나 article에 문제가생긴 경우 ExpiredData 렌더링
  if (typeof newsId !== "number" || newsId < 0 || currentArticle === undefined) {
    return <ExpiredData />;
  }

  // 뉴스 기사 요청 중일 때 Skeleton UI 렌더링
  if (isLoadingArticle) {
    return <ArticleSkeleton />;
  }

  return (
    <article css={css(dynamicNewsStyles)}>
      {currentArticle.image && (
        <figure className="imgGroup">
          <Image src={currentArticle.image} alt="newsImg" width={200} height={200} />
          <figcaption className="alt">{currentArticle.alt}</figcaption>
        </figure>
      )}
      <div className="textGroup">
        <h1>{currentArticle.title}</h1>
        <div className="date">{currentArticle.date}</div>
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
        {currentArticle.text.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <button className="scrollTop" onClick={scrollTop}>
        맨 위로
      </button>
    </article>
  );
}
