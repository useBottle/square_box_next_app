import { SocialUser } from "./../types/types";
import mongoose, { Schema } from "mongoose";

const socialUserSchema = new Schema<SocialUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
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

const SocialUsers = mongoose.models.Users || mongoose.model<SocialUser>("SocialUsers", socialUserSchema);
export default SocialUsers;
