import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import iconv from "iconv-lite";

export async function POST(req: Request) {
  const result = await req.json();
  const url = result.url as string | undefined;

  try {
    let article;
    if (url) {
      console.log(url);
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const originalDoc = cheerio.load(response.data);
      const metaContentType = originalDoc('meta[http-equiv="Content-Type"]').attr("content");
      let charset = "euc-kr";
      if (metaContentType) {
        const match = metaContentType.match(/charset=([^;]+)/);
        if (match && match[1]) {
          charset = match[1].toUpperCase();
        }
      }
      // 문서에 지정된 인코딩 방식에 따라 iconv 로 디코딩.
      const dataBuffer = Buffer.from(response.data);
      const decodedData = iconv.decode(dataBuffer, charset as string);

      // 인코딩한 값으로 각 항목들 추출.
      const $ = cheerio.load(decodedData);
      const title = $("#articleView h1").text().trim();
      const date = $(".firstDate em").text().trim();
      const img = $(".imgad_area img").attr("src");
      const text = $("#realArtcContents p")
        .map((_, item) => $(item).text().trim())
        .get()
        .filter((item) => item !== "");

      article = {
        image: img ? img : "",
        title: title ? title : "",
        date: date ? date : "",
        text: text ? text : [],
      };
    }
    // console.log(article);
    return NextResponse.json({ popularData: article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch popular article data." }, { status: 500 });
  }
}
