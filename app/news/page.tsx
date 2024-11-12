/** @jsxImportSource @emotion/react */

"use client";

import { useSelector } from "react-redux";
import SearchBar from "../component/SearchBar";
import { RootState } from "@/store/store";
import Link from "next/link";
import Image from "next/image";

export default function News(): JSX.Element {
  const news = useSelector((state: RootState) => state.news);

  return (
    <div>
      <SearchBar />
      <ul>
        {news.map((item, index) => {
          return (
            <li key={index}>
              <Link href={`/news/${index}`}>
                <Image src={item.image} alt="newsImg" width={100} height={100} />
                <div className="text">
                  <h1>{item.title}</h1>
                  <p>{item.text}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
