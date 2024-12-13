import axios from "axios";
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { newsList } from "@/types/types";

export async function POST(req: Request) {
  const result = await req.json();
  console.log(result.inputValue);

  const query = encodeURI(result.inputValue);
  const sort = encodeURI(result.sort);

  const url = `https://search.hankookilbo.com/Search?tab=NEWS&sort=${sort}&searchText=${query}&searchTypeSet=TITLE,CONTENTS&selectedPeriod=%EC%A0%84%EC%B2%B4&filter=head`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const newsList = $(".board-list li");
    const newsData: newsList[] = [];
    newsList.each((_, item) => {
      const h3 = $(item).find(".board-list.h3.pc_only").text().trim();
      const href = $(item).find(".board-list.h3.pc_only a").attr("href");
      const prevImg = $(item).find(".img-box a img").attr("src");
      const date = $(item).find(".date.pc_only em").text();
      const summary = $(item).find(".text.pc_only a").text().replace(/\n/g, "").trim();

      const news = {
        title: h3,
        href: href ? href : "",
        prevImg: prevImg ? prevImg : "",
        date: date,
        summary: summary,
      };
      newsData.push(news);
    });
    /* const newsData = await Promise.all(
      newsList.map(async (_, item) => {
        const h3 = $(item).find(".board-list.h3.pc_only").text().trim();
        const href = $(item).find(".board-list.h3.pc_only a").attr("href");
        const date = $(item).find(".date.pc_only em").text();
        const summary = $(item).find(".text.pc_only a").text().replace(/\n/g, "").trim();

        if (href) {
          try {
            const response = await axios.get(href);
            const subPage = cheerio.load(response.data);
            const img = subPage(".img-box img").attr("src");
            const alt = subPage(".img-box img").attr("alt");
            const text = subPage(".editor-p")
              .map((_, item) => subPage(item).text().trim())
              .get();

            return {
              title: h3,
              image: img ? img : "",
              alt: alt ? alt : "",
              date: date,
              summary: summary,
              text: text,
            };
          } catch (error) {
            console.error("Error fetching subpage:", error);
          }
        }

        return {
          title: h3,
          image: "",
          alt: "",
          date: date,
          summary: summary,
          text: "",
        };
      }),
    ); */
    return NextResponse.json({ newsData: newsData });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ message: "received input value" });
}
