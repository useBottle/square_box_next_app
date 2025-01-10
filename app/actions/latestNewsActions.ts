"use server";

import { LatestNewsArticle, newsList } from "@/types/types";
import axios from "axios";
import * as cheerio from "cheerio";

// 최신 뉴스 리스트 요청
export async function getLatestNewsList(): Promise<{ newsTop10List: newsList[]; urls: string[] }> {
  const url = process.env.LATEST_NEWS_API || "";

  try {
    // 최신 뉴스 리스트 preview 데이터 요청
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const list = $("ul.list li");
    const newsData: newsList[] = [];
    list.each((_, item) => {
      const title = $(item).find(".item-box01 .news-con a .tit-news").text().trim();
      const imgUrl = $(item).find(".item-box01 .img-con a img").attr("src");
      const image = imgUrl && !(imgUrl.startsWith("https:") || imgUrl.startsWith("http:")) ? `https:${imgUrl}` : imgUrl;
      const href = $(item).find(".item-box01 .img-con a").attr("href");
      const date = $(item).find(".item-box01 .info-box01 .txt-time").text().trim();
      const summary = $(item).find(".item-box01 .news-con .lead").text().trim();

      const news = {
        title: title,
        href: href || "",
        prevImg: image || "",
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
    return { newsTop10List: [], urls: [] };
  }
}

// 최신 뉴스 단일 기사 요청
export async function getLatestNewsArticle(url: string): Promise<LatestNewsArticle> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const title = $(".title-article01 h1.tit").text().trim();
    const date = $(".title-article01 .update-time").attr("data-published-time");
    const imgUrl = $(".image-zone .img-con .img img").attr("src");
    const image = imgUrl && !(imgUrl.startsWith("https:") || imgUrl.startsWith("http:")) ? `https:${imgUrl}` : imgUrl;
    const alt = $(".image-zone .desc-con .tit-cap").text().trim();
    const text = $(".story-news.article p:not(.txt-copyright.adrs)")
      .map((_, item) => $(item).text().trim())
      .get()
      .filter((item) => item !== "");

    const data = {
      title: title,
      date: date || "",
      image: image || "",
      alt: alt || "",
      text: text,
    };
    return data;
  } catch (error) {
    console.error("Latest news article fetch failed on middleware.", error);
    return { title: "", date: "", image: "", alt: "", text: [] };
  }
}
