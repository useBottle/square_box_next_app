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
      // 한국일보 데이터로 변경해서 가져오기.
    }
    // console.log(article);
    return NextResponse.json({ popularData: article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch popular article data." }, { status: 500 });
  }
}
