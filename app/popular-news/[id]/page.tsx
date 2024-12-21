/** @jsxImportSource @emotion/react */

"use client";

import ArticleSkeleton from "@/app/component/ArticleSkeleton";
import { RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function PopularDynamic(): JSX.Element {
  const popularArticle = useSelector((state: RootState) => state.news.popular);
  const popluarStatus = useSelector((state: RootState) => state.news.popularStatus);

  if (!popularArticle || popularArticle.title === "") {
    // 나중에 잘못된 페이지 접근 UI 추가하기.
    return <div>Invalid news ID</div>;
  }

  if (popluarStatus === "loading") {
    return <ArticleSkeleton />;
  }

  return (
    <div css={css(dynamicNewsStyles)}>
      <div className="imgGroup">
        <Image src={popularArticle.image} alt="newsImg" width={200} height={200} />
      </div>
      <div className="textGroup">
        <h1>{popularArticle.title}</h1>
        <div className="date">{popularArticle.date}</div>
        {popularArticle.text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
    </div>
  );
}
