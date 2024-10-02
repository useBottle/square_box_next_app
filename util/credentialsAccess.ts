import jwt from "jsonwebtoken";
import { User } from "next-auth";

export default function generateAccessToken(user: User) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_PW!, { expiresIn: "1h" });
}
