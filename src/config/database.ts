import mongoose from "mongoose";

if (!process.env.MONGO_URL) {
  throw new Error("Missing MONGO_URL in environment variables");
}

// Define a global cache type for mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare a global variable for hot reload
declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongoose || { conn: null, promise: null };

export default async function connectToDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL, {
      dbName: "Inera_software_Database",
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    global._mongoose = cached;
    console.log("Database Connected");
  } catch (error) {
    cached.promise = null;
    console.error("Database connection failed:", error);
    throw error;
  }

  return cached.conn;
}



