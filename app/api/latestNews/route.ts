import axios from "axios";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { newsList } from "@/types/types";

export async function GET() {
  const category = ["Politics", "Economy", "Sports"];
  const urls = [];
  for (let i = 0; i < category.length; i++) {
    const url = `https://www.hankookilbo.com/News/${category[i]}`;
    urls.push(url);
  }

  try {
    const totalNews: newsList[][] = [];
    urls.map(async (url) => {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const newsList = $("#section-bottom-article-list li");
      const newsData: newsList[] = [];
      newsList.each((_, item) => {
        const h3 = $(item).find("h4 a").text().trim();
        const href = $(item).find("h4 a").attr("href");
        const prevImg = $(item).find("img-box a img").attr("src");
        const date = $(item).find(".date span").text();
        const summary = $(item).find(".text a").text().trim();

        const news = {
          title: h3,
          href: href ? `https://www.hankookilbo.com/News${href}` : "",
          prevImg: prevImg ? prevImg : "",
          date: date,
          summary: summary,
        };
        newsData.push(news);
      });
      totalNews.push(newsData);
    });
    return NextResponse.json({ totalNewsData: totalNews });
  } catch (error) {
    console.error(error);
  }

  // try {
  //   const response = await axios.get(url);
  //   const $ = cheerio.load(response.data);
  //   const newsList = $("#section-bottom-article-list li");
  //   const newsData: newsList[] = [];
  //   newsList.each((_, item) => {
  //     const h3 = $(item).find(".board-list.h3.pc_only").text().trim();
  //     const href = $(item).find(".board-list.h3.pc_only a").attr("href");
  //     const prevImg = $(item).find(".img-box a img").attr("src");
  //     const date = $(item).find(".date.pc_only em").text();
  //     const summary = $(item).find(".text.pc_only a").text().replace(/\n/g, "").trim();

  //     const news = {
  //       title: h3,
  //       href: href ? href : "",
  //       prevImg: prevImg ? prevImg : "",
  //       date: date,
  //       summary: summary,
  //     };
  //     newsData.push(news);
  //   });
  //   return NextResponse.json({ newsData: newsData });
  // } catch (error) {
  //   console.error(error);
  // }
  return NextResponse.json({ message: "received input value" });
}
