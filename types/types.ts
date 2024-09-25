import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  provider?: string;
  createdAt: Date;
}
