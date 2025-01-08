import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  const urls = result.urls as string[] | undefined;

  try {
    let articles;
    if (urls && urls.length !== 0) {
      // console.log(url);
      articles = await Promise.all(
        urls.map(async (item) => {
          const response = await axios.get(item);
          const $ = cheerio.load(response.data);
          const title = $(".col-main .title").text().trim();
          const img = $(".img-box img").attr("src");
          const alt = $(".img-box img").attr("alt");
          let date: string[] = [];
          $(".info .wrt-text dd").map((_, item) => {
            date.push($(item).text().trim());
          });
          const text = $(".editor-p")
            .map((_, item) => $(item).text().trim())
            .get()
            .filter((item) => item !== "");

          const article = {
            title: title || "",
            image: img || "",
            alt: alt || "",
            date: date,
            text: text,
          };
          // console.log(article);
          return article;
        }),
      );
    }
    return NextResponse.json({ articlesData: articles });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch news article data." }, { status: 500 });
  }
}
