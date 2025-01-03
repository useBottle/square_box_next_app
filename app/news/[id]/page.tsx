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

export default function NewsDynamic(): JSX.Element {
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const article = useSelector((state: RootState) => state.news.article);
  const articleStatus = useSelector((state: RootState) => state.news.articleStatus);
  const params = useParams();
  const newsId = Number(params.id);

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
        <button className="bookmark">
          <GoBookmarkFill />
          <span>북마크 하기</span>
        </button>
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
