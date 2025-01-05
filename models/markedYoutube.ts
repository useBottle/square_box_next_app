import { MarkedYoutubeVideo } from "@/types/types";
import mongoose, { Schema } from "mongoose";

const markedYoutubeSchema = new Schema<MarkedYoutubeVideo>({
  kind: { type: String, required: true },
  etag: { type: String, required: true },
  id: {
    videoId: { type: String, required: true },
    kind: { type: String, required: true },
  },
  snippet: { type: Object, required: true },
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

const MarkedYoutube =
  mongoose.models?.MarkedYoutube || mongoose.model<MarkedYoutubeVideo>("MarkedYoutube", markedYoutubeSchema);
export default MarkedYoutube;
