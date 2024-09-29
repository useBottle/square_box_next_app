import dbConnect from "@/util/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  console.log(result);
  const hashedPassword = await bcrypt.hash(result.password, 10);
  console.log(hashedPassword);

  return NextResponse.json({ message: "Signup success" });
}
