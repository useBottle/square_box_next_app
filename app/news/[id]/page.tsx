/** @jsxImportSource @emotion/react */

"use client";

import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import { RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css, CSSObject } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { GoBookmarkFill } from "react-icons/go";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { deleteNewsBookmark, findNewsBookmark, setNewsBookmark } from "@/app/actions/bookmarkActions";

export default function NewsDynamic(): JSX.Element {
  const { data: session } = useSession();
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const article = useSelector((state: RootState) => state.news.article);
  const articleStatus = useSelector((state: RootState) => state.news.articleStatus);
  const params = useParams();
  const newsId = Number(params.id);
  const [bookmarkSuccess, setBookmarkSuccess] = useState<boolean>(false);

  // 데이터 만료 페이지 스타일 객체
  const infoText: CSSObject = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "80vh",
    fontSize: "1.6rem",

    "& a": {
      color: "var(--reverse-font)",
      padding: "1rem 2rem",
      background: "var(--basic-font)",
      borderRadius: "3px",
      marginTop: "8rem",
    },
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 북마크 onSubmit 요청
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentNews = {
      title: newsList[newsId].title,
      date: newsList[newsId].date,
      image: article[newsId].image,
      alt: article[newsId].alt,
      text: article[newsId].text,
      username: session?.user.name,
    };

    if (!session || !session.user || session.user.name === undefined) return;

    try {
      const findBookmark = await findNewsBookmark(currentNews.title, session.user.name);

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

  // 데이터 만료 페이지
  if (typeof newsId !== "number" || newsId < 0 || newsId >= newsList.length) {
    return (
      <div css={css(infoText)}>
        <p>데이터가 만료되었습니다</p>
        <p>다시 시도해주세요</p>
        <Link href="/">HOME</Link>
      </div>
    );
  }

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
        <div className="date">{newsList[newsId].date}</div>
        {session ? (
          <form onSubmit={onSubmit}>
            <button type="submit" className={bookmarkSuccess ? "btnChange" : ""}>
              <GoBookmarkFill className="bookmarkIcon" />
            </button>
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
      <button className="scrollTop" onClick={scrollTop}>
        맨 위로
      </button>
    </article>
  );
}
