"use server";

import Users from "@/models/users";
import dbConnect from "@/util/database";

export async function findUser(email: string) {
  try {
    await dbConnect();
    const findUser = await Users.findOne({ email: email });

    if (findUser) {
      return {
        exists: true,
        message: "user already exists",
      };
    }

    if (!findUser) {
      return {
        exists: false,
        message: "user not exists",
      };
    }
  } catch (error) {
    console.error("find user failed", error);
  }
}
