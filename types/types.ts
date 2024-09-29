import { Document } from "mongoose";

export interface SocialUser extends Document {
  name: string;
  email: string;
  image?: string;
  provider?: string;
  createdAt: Date;
}
