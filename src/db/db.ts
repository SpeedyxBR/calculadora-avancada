import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

// Check if DATABASE_URL is available
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not set. Database functionality will be disabled."
  );
}

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;
export const db = sql ? drizzle(sql, { schema }) : null;
