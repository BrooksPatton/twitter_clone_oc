import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig({
  dialect: "postgresql",
  schema: ["./db/auth-schema.ts", "./db/schema.ts"],
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
