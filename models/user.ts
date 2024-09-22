import { IUser } from "./../types/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
