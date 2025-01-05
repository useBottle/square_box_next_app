"use server";

import MarkedNews from "@/models/markedNews";
import MarkedYoutube from "@/models/markedYoutube";
import { currentArticle, MarkedYoutubeVideo } from "@/types/types";
import dbConnect from "@/util/database";

// * 뉴스 북마크 서버 액션 함수들

// 뉴스 북마크 검색
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

// 뉴스 북마크 삭제
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

// * 유튜브 북마크 서버 액션 함수들

// 유튜브 북마크 검색
export async function findYoutubeBookmark(videoId: string, username: string) {
  try {
    await dbConnect();

    const findBookmark = await MarkedYoutube.findOne({
      videoId: videoId,
      username: username,
    });

    if (findBookmark) {
      return {
        exists: true,
        message: "youtube bookmark already exists",
      };
    }

    if (!findBookmark) {
      return {
        exists: false,
        message: "youtube bookmark not exists",
      };
    }
  } catch (error) {
    console.error("find bookmarked youtube failed", error);
  }
}

// 유튜브 북마크 추가
export async function setYoutubeBookmark(video: MarkedYoutubeVideo) {
  try {
    await dbConnect();

    const markedYoutube = new MarkedYoutube({
      ...video,
    });
    await markedYoutube.save();

    return {
      success: true,
      message: "bookmark youtube success",
    };
  } catch (error) {
    console.error("bookmark youtube failed", error);
  }
}
