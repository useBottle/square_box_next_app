"use server";

import MarkedYoutube from "@/models/markedYoutube";
import { currentYoutubeVideo } from "@/types/types";
import dbConnect from "@/util/database";

// 유튜브 북마크 검색
export async function findYoutubeBookmark(videoId: string, username: string) {
  try {
    await dbConnect();

    const findBookmark = await MarkedYoutube.findOne({
      videoId: videoId,
      username: username,
      category: "youtube",
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
    console.error("find bookmarked youtube video failed", error);
  }
}

// 유튜브 북마크 추가
export async function setYoutubeBookmark(video: currentYoutubeVideo, username: string) {
  try {
    await dbConnect();

    const markedYoutube = new MarkedYoutube({
      ...video,
      username: username,
      category: "youtube",
    });
    await markedYoutube.save();

    return {
      success: true,
      message: "bookmark youtube success",
    };
  } catch (error) {
    console.error("bookmark youtube video failed", error);
  }
}

// 유튜브 북마크 삭제
export async function deleteYoutubeBookmark(videoId: string, username: string) {
  try {
    await dbConnect();

    const deleteBookmark = await MarkedYoutube.deleteOne({
      videoId: videoId,
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
    console.error("bookmark youtube video delete failed", error);
  }
}
