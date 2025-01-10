"use server";

import { articleData } from "@/types/types";
import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchSingleArticle(url: string): Promise<articleData> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const title = $(".col-main .title").text().trim();
    const imgUrl = $(".img-box img").attr("src");
    const image = !(imgUrl?.startsWith("https:") || imgUrl?.startsWith("http:")) && `https:${imgUrl}`;
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
      image: image || "",
      alt: alt || "",
      date: date,
      text: text,
    };
    // console.log(article);
    return article;
  } catch (error) {
    console.error("Single article fetch failed on middleware.", error);
    return { title: "", date: [], image: "", alt: "", text: [] };
  }
}
