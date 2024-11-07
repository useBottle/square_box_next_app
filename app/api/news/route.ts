import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  console.log(result.inputValue);
  return NextResponse.json({ message: "received input value" });
}
