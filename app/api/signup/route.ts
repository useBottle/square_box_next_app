import Users from "@/models/users";
import dbConnect from "@/util/database";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const result = await req.json();
  const hashedPassword = await bcrypt.hash(result.password, 10);

  try {
    await dbConnect();
    const findUser = await Users.findOne({ email: result.email });
    if (findUser) {
      return NextResponse.json({ message: "User already exists", userExists: true });
    }

    const newUser = new Users({
      ...result,
      password: hashedPassword,
      provider: "credentials",
    });
    console.log(newUser);
    await newUser.save();
    return NextResponse.json({ message: "Signup success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Signup failed" });
  }
}
