import { AuthedUser } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<AuthedUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  provider: { type: String, required: true },
  refreshToken: { type: String },
  createdAt: {
    type: String,
    default: () => {
      const date = new Date();
      date.setHours(date.getHours() + 9);
      return date.toISOString();
    },
  },
});

const Users = mongoose.models?.Users || mongoose.model<AuthedUser>("Users", userSchema);
export default Users;
