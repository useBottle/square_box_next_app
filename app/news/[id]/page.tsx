/** @jsxImportSource @emotion/react */

"use client";

import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import { RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { GoBookmarkFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ExpiredData from "@/app/component/ExpiredData";
import { deleteNewsBookmark, findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkNewsActions";

export default function NewsDynamic(): JSX.Element {
  const { data: session } = useSession();
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const article = useSelector((state: RootState) => state.news.article);
  const articleStatus = useSelector((state: RootState) => state.news.articleStatus);
  const params = useParams();
  const newsId = Number(params.id);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || session.user.name === undefined) return;

    // 유저 정보 및 뉴스 데이터 DB 에서 확인 후 북마크 버튼 스타일 변경 트리거 상태 변경.
    async function findMarkedNews() {
      try {
        const findBookmark = await findNewsBookmark(newsList[newsId].title, session?.user.name as string);
        if (findBookmark && findBookmark.exists === true) {
          setBookmarkSuccess(true);
        }
      } catch (error) {
        console.error("news bookmark failed", error);
      }
      setIsLoading(false);
    }
    findMarkedNews();
  }, []);

  // 북마크 onSubmit 요청
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유저 정보가 없으면 onSubmit 이벤트 종료.
    if (!session || !session.user || session.user.name === undefined) return;

    // 현재 뉴스 기사 객체 생성
    const currentNews = {
      title: newsList[newsId].title,
      date: article[newsId].date[1] ? article[newsId].date[1] : article[newsId].date[0],
      image: article[newsId].image,
      alt: article[newsId].alt,
      text: article[newsId].text,
    };

    try {
      const findBookmark = await findNewsBookmark(currentNews.title, session.user.name);

      // 북마크된 데이터 있을 경우 confirm 창 띄우기. 북마크 삭제할지 확인.
      if (findBookmark && findBookmark.exists === true) {
        if (confirm("북마크를 제거하시겠습니까?")) {
          const response = await deleteNewsBookmark(currentNews.title, session.user.name as string);
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

  // newsId 가 안맞거나 article 에 문제가 생긴 경우 ExpiredData 렌더링
  if (
    typeof newsId !== "number" ||
    newsId < 0 ||
    newsId >= newsList.length ||
    newsList.length === 0 ||
    article === undefined
  ) {
    return <ExpiredData />;
  }

  // 뉴스 개별 데이터 요청 중일 때 Skeleton UI 렌더링
  if (articleStatus === "loading") {
    return <ArticleSkeleton />;
  }

  return (
    <article css={css(dynamicNewsStyles)}>
      <figure className="imgGroup">
        <Image src={article[newsId].image} alt="newsImg" width={200} height={200} />
        <figcaption className="alt">{article[newsId].alt}</figcaption>
      </figure>
      <div className="textGroup">
        <h1>{newsList[newsId].title}</h1>
        <div className="date">{article[newsId].date[1] ? article[newsId].date[1] : article[newsId].date[0]}</div>
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
        {article[newsId].text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
      <button
        className="scrollTop"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        맨 위로
      </button>
    </article>
  );
}
