import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  schema: "server/prisma/schema.prisma",
  ...(databaseUrl
    ? {
        datasource: {
          url: databaseUrl,
        },
      }
    : {}),
  migrations: {
    seed: "tsx server/prisma/seed.ts",
  },
});
