/** @jsxImportSource @emotion/react */

"use client";

import { RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function NewsDynamic(): JSX.Element {
  const newsList = useSelector((state: RootState) => state.news.newsList);
  const article = useSelector((state: RootState) => state.news.article);
  const params = useParams();
  const newsId = Number(params.id);

  if (typeof newsId !== "number" || newsId < 0 || newsId >= newsList.length) {
    // 나중에 잘못된 페이지 접근 UI 추가하기.
    return <div>Invalid news ID</div>;
  }

  if (!article || !article[newsId]) {
    // 추후 로딩 중일 때의 UI 추가하기.
    return <div>Loading...</div>;
  }

  return (
    <div css={css(dynamicNewsStyles)}>
      <div className="imgGroup">
        <Image src={article[newsId].image} alt="newsImg" width={200} height={200} />
        <div className="alt">{article[newsId].alt}</div>
      </div>
      <div className="textGroup">
        <h1>{newsList[newsId].title}</h1>
        <div className="date">{newsList[newsId].date}</div>
        {article[newsId].text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
    </div>
  );
}
