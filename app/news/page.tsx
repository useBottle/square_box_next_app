/** @jsxImportSource @emotion/react */

"use client";

import { useSelector } from "react-redux";
import SearchBar from "../component/SearchBar";
import { RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";
import { newsListStyles } from "@/styles/News.styles";
import { css } from "@emotion/react";

export default function News(): JSX.Element {
  const news = useSelector((state: RootState) => state.news);

  return (
    <div>
      <SearchBar />
      <ul css={css(newsListStyles)}>
        {news.map((item, index) => {
          return (
            <Link href={`/news/${index}`} key={index}>
              <li>
                <Image src={item.image} alt="newsImg" width={100} height={100} />
                <div className="textGroup">
                  <h6>{item.title}</h6>
                  <div className="date">{item.date}</div>
                  <p>{item.text}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
