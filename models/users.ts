import { IUser } from "./../types/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  createdAt: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setHours(date.getHours() + 9);
      return date;
    },
  },
});

const Users = mongoose.models.Users || mongoose.model<IUser>("Users", userSchema);
export default Users;
