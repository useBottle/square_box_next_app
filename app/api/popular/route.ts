import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  const url = result.url as string | undefined;

  try {
    let article;
    if (url) {
      console.log(url);
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const metaContentType = $('meta[http-equiv="Content-Type"]').attr("content");
      let charset;
      if (metaContentType) {
        const match = metaContentType.match(/charset=([^;]+)/);
        if (match && match[1]) {
          charset = match[1].toUpperCase();
        }
      }
      console.log(charset);
      const title = $("#articleView h1").text().trim();
      const date = $(".lastDate em").text().trim();
      const img = $(".imgad_area img").attr("src");
      const text = $(".editor-p")
        .map((_, item) => $(item).text().trim())
        .get()
        .filter((item) => item !== "");

      const article = {
        image: img ? img : "",
        title: title ? title : "",
        date: date ? date : "",
        text: text ? text : [],
      };
      console.log(article);
      return article;
    }
    return NextResponse.json({ popularData: article });
  } catch (error) {
    console.error(error);
  }
}
