import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  const { inputValue } = result;

  try {
    const params = new URLSearchParams({
      part: "snippet",
      q: inputValue,
      type: "video",
      order: "relevance",
    });

    const response = await axios.get(`${process.env.YOUTUBE_SEARCH_API}${params.toString()}`);
    const result = response.data;
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error("Youtube fetch failed.", error);
  }
}
