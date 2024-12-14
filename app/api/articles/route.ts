import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  const url = result.url as string[] | undefined;

  try {
    console.log(url);
    // 각 url 을 순회하여 alt, image, text 크롤링하는 로직 추가.

    if (url) {
      url.map(async (item) => {
        const response = await axios.get(item);
        const $ = cheerio.load(response.data);
        const img = $(".img-box img").attr("src");
        const alt = $(".img-box img").attr("alt");
        const text = $(".editor-p")
          .map((_, item) => $(item).text().trim())
          .get();

        const article = {
          image: img ? img : "",
          alt: alt ? alt : "",
          text: text,
        };
        console.log(article);
        return article;
      });
    }
    return NextResponse.json({ message: "url" });
  } catch (error) {
    console.error(error);
  }
}
