/** @jsxImportSource @emotion/react */

"use client";

import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import { RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function NewsDynamic(): JSX.Element {
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const article = useSelector((state: RootState) => state.news.article);
  const articleStatus = useSelector((state: RootState) => state.news.articleStatus);
  const params = useParams();
  const newsId = Number(params.id);

  if (typeof newsId !== "number" || newsId < 0 || newsId >= newsList.length) {
    // 나중에 잘못된 페이지 접근 UI 추가하기.
    return <div>Invalid news ID</div>;
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
        <time className="date">{newsList[newsId].date}</time>
        {article[newsId].text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
    </article>
  );
}
