"use server";

import { LatestNewsArticle, newsList } from "@/types/types";
import axios from "axios";
import * as cheerio from "cheerio";

// 최신 뉴스 리스트 요청
export async function getLatestNewsList() {
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
