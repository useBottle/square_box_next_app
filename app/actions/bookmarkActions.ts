"use server";

import MarkedNews from "@/models/markedNews";
import { currentArticle } from "@/types/types";
import dbConnect from "@/util/database";

export async function setNewsBookmark(article: currentArticle, username: string) {
  try {
    await dbConnect();
    const markedNews = new MarkedNews({
      title: article.title,
      date: article.date,
      image: article.image,
      alt: article.alt,
      text: article.text,
      username: username,
    });
    await markedNews.save();
    return {
      message: "bookmark news success",
    };
  } catch (error) {
    console.error("bookmark news failed", error);
  }
}
