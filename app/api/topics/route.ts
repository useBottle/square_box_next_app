import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(process.env.TOPICS_API_URL || "");
    const result = response.data;

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
