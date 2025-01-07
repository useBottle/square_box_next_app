"use server";

import MarkedNews from "@/models/markedNews";
import { LatestNewsArticle } from "@/types/types";
import dbConnect from "@/util/database";

// 뉴스 북마크 검색
export async function findNewsBookmark(title: string, username: string) {
  try {
    await dbConnect();

    const findBookmark = await MarkedNews.findOne({
      title: title,
      username: username,
      category: "news",
    });

    if (findBookmark) {
      return {
        exists: true,
        message: "article bookmark already exists",
      };
    }

    if (!findBookmark) {
      return {
        exists: false,
        message: "article bookmark not exists",
      };
    }
  } catch (error) {
    console.error("find bookmarked news article failed", error);
  }
}

// 뉴스 북마크 추가
export async function setNewsBookmark(article: LatestNewsArticle, username: string) {
  try {
    await dbConnect();

    const markedNews = new MarkedNews({
      ...article,
      username: username,
      category: "news",
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

// 뉴스 북마크 삭제
export async function deleteNewsBookmark(article: LatestNewsArticle, username: string) {
  try {
    await dbConnect();

    const deleteBookmark = await MarkedNews.deleteOne({
      ...article,
      username: username,
      category: "news",
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
