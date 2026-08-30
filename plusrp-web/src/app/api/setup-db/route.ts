import { NextResponse } from "next/server";
// @ts-ignore
import { Pool } from "pg";

export async function GET() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        discord_id    VARCHAR(32) UNIQUE NOT NULL,
        username      VARCHAR(64),
        avatar        TEXT,
        credits       INTEGER NOT NULL DEFAULT 0,
        created_at    TIMESTAMPTZ DEFAULT NOW(),
        updated_at    TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS credit_transactions (
        id            SERIAL PRIMARY KEY,
        user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount        INTEGER NOT NULL,
        type          VARCHAR(32) NOT NULL,
        description   TEXT,
        reference     VARCHAR(128),
        created_at    TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS packages (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(128) NOT NULL,
        description   TEXT,
        price         INTEGER NOT NULL,
        category      VARCHAR(64) DEFAULT 'other',
        image_url     TEXT,
        active        BOOLEAN DEFAULT true,
        sort_order    INTEGER DEFAULT 0,
        created_at    TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS purchases (
        id            SERIAL PRIMARY KEY,
        user_id       INTEGER REFERENCES users(id) ON DELETE CASCADE,
        package_id    INTEGER REFERENCES packages(id),
        credits_spent INTEGER NOT NULL,
        status        VARCHAR(32) DEFAULT 'pending',
        delivered_at  TIMESTAMPTZ,
        created_at    TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_users_discord ON users(discord_id);
    `);

    await pool.end();
    return NextResponse.json({ success: true, message: "Tables created successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
