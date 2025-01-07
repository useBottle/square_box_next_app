import { MarkedYoutubeVideo } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const markedYoutubeSchema = new Schema<MarkedYoutubeVideo>({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  channelTitle: { type: String, required: true },
  publishedAt: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String, required: true },
  username: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setHours(date.getHours() + 9);
      return date;
    },
  },
});

const MarkedYoutube =
  mongoose.models?.MarkedYoutube || mongoose.model<MarkedYoutubeVideo>("MarkedYoutube", markedYoutubeSchema);
export default MarkedYoutube;
