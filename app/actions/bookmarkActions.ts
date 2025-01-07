"use server";

import MarkedNews from "@/models/markedNews";
import MarkedYoutube from "@/models/markedYoutube";
import dbConnect from "@/util/database";
import { ObjectId } from "mongodb";

// 뉴스 북마크 데이터 검색 및 반환
export async function getMarkedNews(username: string) {
  try {
    await dbConnect();

    const findBookmark = await MarkedNews.find({ username: username, category: "news" });

    const newsData = findBookmark.map((item) => {
      const doc = item._doc;
      return { ...doc, _id: doc._id.toString() };
    });

    if (findBookmark) {
      return {
        exists: true,
        number: findBookmark.length,
        data: newsData,
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

    const youtubeData = findBookmark.map((item) => {
      const doc = item._doc;
      return { ...doc, _id: doc._id.toString() };
    });

    if (findBookmark) {
      return {
        exists: true,
        number: findBookmark.length,
        data: youtubeData,
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

// id 값을 사용해 뉴스 북마크 삭제
export async function deleteNewsBookmark(id: string, username: string) {
  try {
    await dbConnect();
    const deleteBookmark = await MarkedNews.deleteOne({ _id: new ObjectId(id), username: username, category: "news" });

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
    console.error("bookmark news delete failed with id value", error);
  }
}

// id 값을 사용해 유튜브 북마크 삭제
export async function deleteYoutubeBookmark(id: string, username: string) {
  try {
    await dbConnect();
    const deleteBookmark = await MarkedYoutube.deleteOne({
      _id: new ObjectId(id),
      username: username,
      category: "youtube",
    });

    if (deleteBookmark.deletedCount === 1) {
      return {
        delete: true,
        message: "bookmark youtube delete success",
      };
    }

    if (deleteBookmark.deletedCount === 0) {
      return {
        delete: false,
        message: "bookmark youtube delete failed",
      };
    }
  } catch (error) {
    console.error("bookmark youtube video delete failed with id value", error);
  }
}
