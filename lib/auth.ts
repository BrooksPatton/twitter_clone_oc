/**
 * Better Auth configuration.
 *
 * IMPORTANT: This file is read by `npx auth@latest generate` to produce
 * db/auth-schema.ts.  Never hand-edit db/auth-schema.ts — re-run the CLI
 * instead.  drizzle-kit is the sole migration owner; it converts this schema
 * to SQL and applies it.
 *
 * Sessions: Better Auth uses database sessions by default (no JWT).
 * Email verification: disabled for MVP per spec.
 */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "@/db";
import * as authSchema from "@/db/auth-schema";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),

  emailAndPassword: {
    enabled: true,
    // No email verification for MVP.
    requireEmailVerification: false,
  },

  plugins: [username()],
});

export type Auth = typeof auth;
