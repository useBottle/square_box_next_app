import { CredentialsUser } from "./../types/types";
import mongoose, { Schema } from "mongoose";

const credentialsUserSchema = new Schema<CredentialsUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

const CredentialsUsers =
  mongoose.models.CredentialsUsers ||
  mongoose.model<CredentialsUser>("CredentialsUsers", credentialsUserSchema, "Credentials_Users");
export default CredentialsUsers;
