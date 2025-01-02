import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  const { inputValue } = result;

  try {
    const params = new URLSearchParams({
      q: inputValue,
      part: "snippet",
      chart: "mostPopular",
      maxResults: "10",
      regionCode: "kr",
      key: process.env.YOUTUBE_API_KEY as string,
    });

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`);
    const result = response.data;
    // console.log(result);
    return NextResponse.json({ youtubeData: result });
  } catch (error: unknown) {
    console.error("Youtube fetch failed.", error);
  }
}
