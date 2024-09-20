import mongoose, { Connection } from "mongoose";

const DB_URI = process.env.DATABASE_URI as string;

if (!DB_URI) {
  throw new Error("Please define the DATABASE_URI environment variable inside .env");
}

export interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// 전역 객체 초기화
declare global {
  const mongoose: MongooseCache | undefined;
}

// 글로벌 객체에 mongoose 캐시 설정
const globalMongoose = globalThis as typeof globalThis & { mongoose?: MongooseCache };

if (typeof globalMongoose.mongoose === "undefined") {
  globalMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalMongoose.mongoose;

export default async function dbConnect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .set("debug", true)
      .set("strictQuery", false)
      .connect(DB_URI)
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
