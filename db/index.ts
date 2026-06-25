import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// postgres.js connection — max 1 connection in serverless/edge to avoid
// exhausting the pool; tune upward if running a long-lived server process.
const client = postgres(process.env.DATABASE_URL, { max: 1 });

export const db = drizzle(client);
