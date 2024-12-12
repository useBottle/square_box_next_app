import axios from "axios";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { newsData } from "@/types/types";

export async function POST(req: Request) {
  const result = await req.json();
  console.log(result.inputValue);

  const query = encodeURI(result.inputValue);
  const sort = encodeURI(result.sort);

  const url = `https://search.hankookilbo.com/Search?tab=NEWS&sort=${sort}&searchText=${query}&searchTypeSet=TITLE,CONTENTS&selectedPeriod=%EC%A0%84%EC%B2%B4&filter=head`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const newsData: newsData[] = [];
    const newsList = $(".board-list li");

    newsList.each((_, item) => {
      const h3 = $(item).find(".board-list.h3.pc_only").text().trim();
      const img = $(item).find(".img-box a img").attr("src");
      const alt = $(item).find(".img-box a img").attr("alt");
      const date = $(item).find(".date.pc_only em").text();
      const text = $(item).find(".text.pc_only a").text().replace(/\n/g, "").trim();

      const news = {
        title: h3,
        image: img ? img : "",
        alt: alt ? alt : "",
        date: date,
        text: text,
      };
      newsData.push(news);
    });
    console.log(newsData);
    return NextResponse.json({ newsData: newsData });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "received input value" });
}
