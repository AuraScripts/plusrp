// @ts-ignore
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

export async function getOrCreateUser(discordId: string, username?: string, avatar?: string) {
  // Try to find existing user
  const existing = await pool.query(
    "SELECT * FROM users WHERE discord_id = $1",
    [discordId]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  // Create new user
  const result = await pool.query(
    `INSERT INTO users (discord_id, username, avatar, credits)
     VALUES ($1, $2, $3, 0)
     RETURNING *`,
    [discordId, username || null, avatar || null]
  );

  return result.rows[0];
}

export async function getUserCredits(discordId: string) {
  const result = await pool.query(
    "SELECT credits FROM users WHERE discord_id = $1",
    [discordId]
  );
  return result.rows[0]?.credits ?? 0;
}
