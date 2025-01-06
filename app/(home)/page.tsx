/** @jsxImportSource @emotion/react */

"use client";

import Link from "next/link";
import Topics from "../component/Topics";
import styles from "../../styles/LatestNews.module.scss";
import axios from "axios";
import * as cheerio from "cheerio";
import { setNewsArticles } from "../actions/newsActions";
import { newsList } from "@/types/types";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  // async function fetchData() {
  //   const url = process.env.LATEST_NEWS_API || "";

  //   try {
  //     // 최신 뉴스 리스트 요청
  //     const response = await axios.get(url);
  //     const $ = cheerio.load(response.data);
  //     const list = $("ul.list li");
  //     const newsData: newsList[] = [];
  //     list.each((_, item) => {
  //       const title = $(item).find(".item-box01 .news-con a .tit-news").text().trim();
  //       const img = $(item).find(".item-box01 .img-con a img").attr("src");
  //       const href = $(item).find(".item-box01 .img-con a").attr("href");
  //       const date = $(item).find(".item-box01 .info-box01 .txt-time").text().trim();
  //       const summary = $(item).find(".item-box01 .news-con .lead").text().trim();

  //       const news = {
  //         title: title,
  //         href: href || "",
  //         prevImg: img || "",
  //         date: date,
  //         summary: summary,
  //       };
  //       newsData.push(news);
  //     });
  //     const imgExistNewsData = newsData.filter((item) => item.prevImg !== "");
  //     const textExistNewsData = imgExistNewsData.filter((item) => item.summary !== "");
  //     const newsTop10List = textExistNewsData.slice(0, 10);
  //     const urls = newsTop10List.map((item) => item.href);

  //     // 최신 뉴스 리스트 요소들의 url 순회하여 각 뉴스 개별 기사 데이터 요청
  //     const promises = urls.map(async (url) => {
  //       try {
  //         const response = await axios.get(url);
  //         const $ = cheerio.load(response.data);
  //         const title = $(".title-article01 h1.tit").text().trim();
  //         const date = $(".title-article01 .update-time").attr("data-published-time");
  //         const img = $(".image-zone .img-con .img img").attr("src");
  //         const alt = $(".image-zone .desc-con .tit-cap").text().trim();
  //         const text = $(".story-news.article p:not(.txt-copyright.adrs)")
  //           .map((_, item) => $(item).text().trim())
  //           .get()
  //           .filter((item) => item !== "");

  //         return {
  //           title: title,
  //           date: date || "",
  //           image: img || "",
  //           alt: alt || "",
  //           text: text,
  //         };
  //       } catch (error) {
  //         console.error(`Error fetching article: ${url}`, error);
  //         return null;
  //       }
  //     });

  //     const newsTop10Articles = await Promise.all(promises);

  //     // 요청이 실패하여 null 을 반환한 경우 제외.
  //     const filteredNewsTop10Articles = newsTop10Articles.filter((article) => article !== null);

  //     // 예외 처리된 최종 결과를 서버 액션을 통해 캐싱.
  //     await setNewsArticles(filteredNewsTop10Articles);

  //     return newsTop10List;
  //   } catch (error) {
  //     console.error("Error fetching latest news", error);
  //   }
  // }

  const result = await fetchData();
  // console.log(result);

  return (
    <div>
      <Topics />
      <div className={styles.latestNews}>
        <h4>최신 뉴스 Top 10</h4>
        <ul>
          {result ? (
            result.map((item, index) => {
              return (
                <Link href={`/latest-news/${item.title}`} key={index}>
                  <li>
                    <img src={item.prevImg} width={100} height={100} alt="newsImg" />
                    <div className={styles.textGroup}>
                      <h6>{item.title}</h6>
                      <div className={styles.date}>{item.date}</div>
                      <p>{item.summary}</p>
                    </div>
                  </li>
                </Link>
              );
            })
          ) : (
            // 데이터 로딩 실패 시 제공할 UI
            <div className={styles.infoText}>
              <p>데이터를 서버에서 불러오고 있습니다</p>
              <p>새로고침 해주세요</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
