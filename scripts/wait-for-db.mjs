// scripts/wait-for-db.mjs
import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Please check your .env file.");
  process.exit(1);
}

const maxRetries = 30;
const retryDelayMs = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    await client.connect();
    await client.end();

    console.log("PostgreSQL is ready.");
    process.exit(0);
  } catch {
    console.log(`Waiting for PostgreSQL... (${attempt}/${maxRetries})`);

    try {
      await client.end();
    } catch {
      // ignore
    }

    await sleep(retryDelayMs);
  }
}

console.error("PostgreSQL is not available. Please check Docker or DATABASE_URL.");
process.exit(1);