"use server";

import MarkedNews from "@/models/markedNews";
import { currentArticle } from "@/types/types";
import dbConnect from "@/util/database";

export async function setNewsBookmark(article: currentArticle, username: string) {
  try {
    await dbConnect();

    // 데이터베이스에서 동일한 데이터 있는지 확인 후 결과 반환
    const existingBookmark = await MarkedNews.findOne({
      title: article.title,
      username: username,
    });

    if (existingBookmark) {
      return {
        exists: true,
        message: "bookmark already exists",
      };
    }

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
      success: true,
      message: "bookmark news success",
    };
  } catch (error) {
    console.error("bookmark news failed", error);
  }
}

export async function deleteNewsBookmark(title: string, username: string) {
  try {
    await dbConnect();

    const deleteBookmark = await MarkedNews.deleteOne({
      title: title,
      username: username,
    });

    if (deleteBookmark.deletedCount === 1) {
      return {
        delete: true,
        message: "bookmark news delete success",
      };
    }

    if (deleteBookmark.deletedCount === 0) {
      return {
        delete: false,
        message: "bookmark news delete failed",
      };
    }
  } catch (error) {
    console.error("bookmark news delete failed", error);
  }
}
