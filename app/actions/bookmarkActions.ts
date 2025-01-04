"use server";

import MarkedNews from "@/models/markedNews";
import { currentArticle } from "@/types/types";
import dbConnect from "@/util/database";

export async function findNewsBookmark(title: string, username: string) {
  try {
    await dbConnect();

    const findBookmark = await MarkedNews.findOne({
      title: title,
      username: username,
    });

    if (findBookmark) {
      return {
        exists: true,
        message: "bookmark already exists",
      };
    }

    if (!findBookmark) {
      return {
        exists: false,
        message: "bookmark not exists",
      };
    }
  } catch (error) {
    console.error("bookmark news failed", error);
  }
}

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
