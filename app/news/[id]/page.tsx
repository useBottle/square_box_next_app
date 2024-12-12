/** @jsxImportSource @emotion/react */

"use client";

import { RootState } from "@/store/store";
import { dynamicNewsStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function NewsDynamic(): JSX.Element {
  const news = useSelector((state: RootState) => state.news);
  const params = useParams();
  const newsId = Number(params.id);
  console.log("News ID:", newsId);

  if (typeof newsId !== "number" || newsId < 0 || newsId >= news.length) {
    // 나중에 잘못된 페이지 접근 UI 추가하기.
    return <div>Invalid news ID</div>;
  }

  return (
    <div css={css(dynamicNewsStyles)}>
      <Image src={news[newsId].image} alt="newsImg" width={200} height={200} quality={100} />
      <h1>{news[newsId].title}</h1>
      <div>{news[newsId].date}</div>
      <p>{news[newsId].text}</p>
    </div>
  );
}
