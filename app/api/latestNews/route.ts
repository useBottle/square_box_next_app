import axios from "axios";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { newsList } from "@/types/types";

export async function POST(req: Request) {
  const category = ["Politics", "Economy", "Sports"];

  const urls = [`https://www.hankookilbo.com/News/${""}`];
  const politicsUrl = "https://www.hankookilbo.com/News/Politics";

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
