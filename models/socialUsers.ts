import { Users } from "./../types/types";
import mongoose, { Schema } from "mongoose";

const socialUserSchema = new Schema<Users>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String },
  provider: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setHours(date.getHours() + 9);
      return date;
    },
  },
});

const SocialUsers =
  mongoose.models.SocialUsers || mongoose.model<Users>("SocialUsers", socialUserSchema, "Social_Users");
export default SocialUsers;
