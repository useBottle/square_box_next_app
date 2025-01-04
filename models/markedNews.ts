import { MarkedNewsArticle } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const markedNewsSchema = new Schema<MarkedNewsArticle>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true },
  alt: { type: String, required: true },
  text: { type: [String], required: true },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setHours(date.getHours() + 9);
      return date;
    },
  },
});

const MarkedNews = mongoose.models?.MarkedNews || mongoose.model<MarkedNewsArticle>("MarkedNews", markedNewsSchema);
export default MarkedNews;
