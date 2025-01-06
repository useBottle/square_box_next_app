"use server";

import MarkedNews from "@/models/markedNews";
import MarkedYoutube from "@/models/markedYoutube";
import dbConnect from "@/util/database";

// 뉴스 북마크 데이터 검색 및 반환
export async function getMarkedNews(username: string) {
  try {
    await dbConnect();

    const findBookmark = await MarkedNews.find({ username: username, category: "news" });

    if (findBookmark) {
      return {
        exists: true,
        data: findBookmark,
      };
    }

    if (!findBookmark) {
      return {
        exists: false,
        message: "bookmarked news not found",
      };
    }
  } catch (error) {
    console.error("get bookmarked news articles failed", error);
  }
}

// 유튜브 북마크 데이터 검색 및 반환
export async function getMarkedYoutube(username: string) {
  try {
    await dbConnect();

    const findBookmark = await MarkedYoutube.find({ username: username, category: "youtube" });

    if (findBookmark) {
      return {
        exists: true,
        data: findBookmark,
      };
    }

    if (!findBookmark) {
      return {
        exists: false,
        message: "bookmarked youtube videos not found",
      };
    }
  } catch (error) {
    console.error("get bookmarked youtube videos failed", error);
  }
}
