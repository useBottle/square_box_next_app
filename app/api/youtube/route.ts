import { YouTubeVideo } from "@/types/types";
import axios from "axios";
import { NextResponse } from "next/server";
import { decode } from "html-entities";

export async function POST(req: Request) {
  const result = await req.json();
  const { inputValue } = result;

  // HTML Entity Decode
  function decodeHtmlEntities(text: string): string {
    return decode(text);
  }

  // 날짜 변환 함수
  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }

  try {
    const params = new URLSearchParams({
      q: inputValue,
      part: "snippet",
      chart: "mostPopular",
      maxResults: "20",
      regionCode: "kr",
      key: process.env.YOUTUBE_API_KEY as string,
    });

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);
    const result = response.data;

    const youtubeDataModified = { ...result };
    const modifiedItems = youtubeDataModified.items.map((item: YouTubeVideo) => {
      item.snippet.title = decodeHtmlEntities(item.snippet.title);
      item.snippet.description = decodeHtmlEntities(item.snippet.description);
      item.snippet.publishedAt = formatDate(item.snippet.publishedAt);
      return item;
    });
    // videoId undefined 인 데이터 필더링
    const filterdItems = modifiedItems.filter((item: YouTubeVideo) => item.id.videoId !== undefined);
    youtubeDataModified.items = filterdItems;

    console.log(youtubeDataModified.items);
    return NextResponse.json({ youtubeData: youtubeDataModified });
  } catch (error: unknown) {
    console.error("Youtube fetch failed.", error);
    return NextResponse.json({ error: "Youtube fetch failed", status: 500 });
  }
}
