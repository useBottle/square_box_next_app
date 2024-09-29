import CredentialsUsers from "@/models/credentialsUsers";
import dbConnect from "@/util/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  console.log(result);
  const hashedPassword = await bcrypt.hash(result.password, 10);
  console.log(hashedPassword);

  try {
    await dbConnect();
    const newUser = new CredentialsUsers({
      ...result,
      password: hashedPassword,
      provider: "credentials",
    });

    await newUser.save();
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ message: "Signup success" });
}
