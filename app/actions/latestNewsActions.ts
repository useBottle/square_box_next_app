"use server";

import { newsList } from "@/types/types";
import axios from "axios";
import * as cheerio from "cheerio";

// 최신 뉴스 리스트 요청
export async function fetchData() {
  const url = process.env.LATEST_NEWS_API || "";

  try {
    // 최신 뉴스 리스트 preview 데이터 요청
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const list = $("ul.list li");
    const newsData: newsList[] = [];
    list.each((_, item) => {
      const title = $(item).find(".item-box01 .news-con a .tit-news").text().trim();
      const img = $(item).find(".item-box01 .img-con a img").attr("src");
      const href = $(item).find(".item-box01 .img-con a").attr("href");
      const date = $(item).find(".item-box01 .info-box01 .txt-time").text().trim();
      const summary = $(item).find(".item-box01 .news-con .lead").text().trim();

      const news = {
        title: title,
        href: href || "",
        prevImg: img || "",
        date: date,
        summary: summary,
      };
      newsData.push(news);
    });
    const imgExistNewsData = newsData.filter((item) => item.prevImg !== "");
    const textExistNewsData = imgExistNewsData.filter((item) => item.summary !== "");
    const newsTop10List = textExistNewsData.slice(0, 10);
    const urls = newsTop10List.map((item) => item.href);

    return { newsTop10List: newsTop10List, urls: urls };
  } catch (error) {
    console.error("Error fetching latest news", error);
  }
}

// 최신 뉴스 url 로 각 개별 데이터 요청
export async function getLatestNewsArticle(urls: string[]) {
  try {
    const results = urls
      .map(async (url) => {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $(".title-article01 h1.tit").text().trim();
        const date = $(".title-article01 .update-time").attr("data-published-time");
        const img = $(".image-zone .img-con .img img").attr("src");
        const alt = $(".image-zone .desc-con .tit-cap").text().trim();
        const text = $(".story-news.article p:not(.txt-copyright.adrs)")
          .map((_, item) => $(item).text().trim())
          .get()
          .filter((item) => item !== "");

        return {
          title: title,
          date: date || "",
          image: img || "",
          alt: alt || "",
          text: text,
        };
      })
      .filter((article) => article !== null);
    return results;
  } catch (error) {
    console.error("fetching latest news articles failed", error);
  }
}

// // 최신 뉴스 단일 기사 요청
// export async function getLatestArticle(title: string) {
//   const url = process.env.LATEST_NEWS_API || "";

//   let href;

//   interface articlesResult {
//     url: string;
//     title: string;
//   }

//   try {
//     const firstResponse = await axios.get(url);
//     const first = cheerio.load(firstResponse.data);
//     // const list = first("ul.list li").slice(0, 10)[id];
//     const list = first("ul.list li").slice(0, 10);
//     const articlesResult: articlesResult[] = [];
//     const articles = list.map((_, item) => {
//       const url = first(item).find(".item-box01 .img-con a").attr("href");
//       const title = first(item).find(".title-article01 h1.tit").text().trim();
//       articlesResult.push({ url: url as string, title: title });
//     });
//     return articlesResult;

//     // href = first(list).find(".item-box01 .img-con a").attr("href");

//     // const secondResponse = await axios.get(href as string);
//     // const second = cheerio.load(secondResponse.data);
//     // const title = second(".title-article01 h1.tit").text().trim();
//     // const date = second(".title-article01 .update-time").attr("data-published-time");
//     // const imgSource = second(".image-zone .img-con .img img").attr("src");
//     // const img = imgSource?.startsWith("//") ? `https:${imgSource}` : imgSource;
//     // const alt = second(".image-zone .desc-con .tit-cap").text().trim();
//     // const text = second(".story-news.article p:not(.txt-copyright.adrs)")
//     //   .map((_, item) => second(item).text().trim())
//     //   .get()
//     //   .filter((item) => item !== "");

//     // return {
//     //   title: title,
//     //   date: date || "",
//     //   image: img || "",
//     //   alt: alt || "",
//     //   text: text,
//     // };
//   } catch (error) {
//     console.error(`Error fetching article: ${href}`, error);
//     return null;
//   }
// }
