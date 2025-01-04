"use server";

import axios from "axios";
import * as cheerio from "cheerio";

export async function getLatestArticle(id: number) {
  const url = process.env.LATEST_NEWS_API || "";

  let href;

  // 최신 뉴스 단일 기사 요청
  try {
    const firstResponse = await axios.get(url);
    const first = cheerio.load(firstResponse.data);
    const list = first("ul.list li").slice(0, 10)[id];
    href = first(list).find(".item-box01 .img-con a").attr("href");

    const secondResponse = await axios.get(href as string);
    const second = cheerio.load(secondResponse.data);
    const title = second(".title-article01 h1.tit").text().trim();
    const date = second(".title-article01 .update-time").attr("data-published-time");
    const imgSource = second(".image-zone .img-con .img img").attr("src");
    const img = imgSource?.startsWith("//") ? `https:${imgSource}` : imgSource;
    const alt = second(".image-zone .desc-con .tit-cap").text().trim();
    const text = second(".story-news.article p:not(.txt-copyright.adrs)")
      .map((_, item) => second(item).text().trim())
      .get()
      .filter((item) => item !== "");

    return {
      title: title,
      date: date || "",
      image: img || "",
      alt: alt || "",
      text: text,
    };
  } catch (error) {
    console.error(`Error fetching article: ${href}`, error);
    return null;
  }
}
