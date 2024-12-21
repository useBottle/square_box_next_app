import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  const url = result.url as string[] | undefined;

  try {
    let article;
    if (url && url.length !== 0) {
      // console.log(url);
      article = await Promise.all(
        url.map(async (item) => {
          const response = await axios.get(item);
          const $ = cheerio.load(response.data);
          const title = $(".articleSubject").text().trim();
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
          // console.log(article);
          return article;
        }),
      );
    }
    return NextResponse.json({ popularData: article });
  } catch (error) {
    console.error(error);
  }
}
