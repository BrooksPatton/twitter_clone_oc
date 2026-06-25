/**
 * Application tables (hand-authored).
 *
 * Auth tables (user, session, account, verification) live in auth-schema.ts
 * and are owned by the Better Auth CLI — do not move them here.
 */
import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { user } from "@/db/auth-schema";

export const posts = pgTable(
  "posts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    content: varchar("content", { length: 255 }).notNull(),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("posts_authorId_idx").on(table.authorId)],
);

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(user, {
    fields: [posts.authorId],
    references: [user.id],
  }),
}));
