import mongoose from "mongoose";
import { mongodbUri } from "@/lib/env";

// Cache connection in dev to survive hot reloads
type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWithMongoose = globalThis as any;

const cached: Cached = globalWithMongoose._mongoose ?? {
  conn: null,
  promise: null,
};
globalWithMongoose._mongoose = cached;

export async function connectDB() {
  if (!mongodbUri)
    throw new Error("Missing MONGODB_URI - set it in .env.local");

  // Reuse only a live connection, verified with ping
  if (cached.conn && mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db?.admin().ping();
      return cached.conn;
    } catch {
      cached.promise = null;
      cached.conn = null;
    }
  }

  try {
    // Fresh promise each reconnect, never reuse a stale one
    cached.promise = mongoose.connect(mongodbUri, {
      dbName: "perfectionist-diary",
    });
    cached.conn = await cached.promise;
    await mongoose.connection.db?.admin().ping();

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}
