/**@jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { fetchArticles, fetchNews } from "@/store/news";
import { TopicsType } from "@/types/types";

export default function TopicSingle({ item }: { item: TopicsType }) {
  const [clickedKeyword, setClickedKeyword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const clickKeyword = async (keyword: string) => {
      if (keyword === "") return;

      try {
        const result = await dispatch(fetchNews(keyword)).unwrap();
        const urls = result[1];
        if (urls.length !== 0) {
          await dispatch(fetchArticles(urls));
        }
      } catch (error) {
        console.error("Failed fetching news data of top10 keyword.", error);
      }
    };

    if (clickedKeyword === "" || clickedKeyword === undefined) return;
    if (clickedKeyword !== "") clickKeyword(clickedKeyword);
  }, [clickedKeyword]);

  return (
    <Link href="/news" onClick={() => setClickedKeyword(item.keyword)}>
      <li>
        <span className="rank">{item.rank}</span>
        <span className="keyword">{item.keyword}</span>
        <span className="state">
          {(() => {
            if (item.state === "n") {
              return <FaPlus className="new" />;
            } else if (item.state === "s") {
              return <FaMinus className="stay" />;
            } else if (item.state === "+") {
              return <FaCaretUp className="up" />;
            } else if (item.state === "-") {
              return <FaCaretDown className="down" />;
            }
          })()}
        </span>
      </li>
    </Link>
  );
}
