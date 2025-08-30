import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  export const calculations = pgTable("calculations", {
    id: serial("id").primaryKey(),
    expression: varchar("expression", { length: 256 }).notNull(),
    result: varchar("result", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });