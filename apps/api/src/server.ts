import "dotenv/config";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

const app = createApp();

async function startServer() {
  const port = Number(process.env.PORT) || env.PORT || 4000;
  const host = "0.0.0.0";

  // Bind and listen immediately on 0.0.0.0 so Render detects active port
  const server = app.listen(port, host, () => {
    console.log(`Nexiora EV API running on http://${host}:${port}`);
    console.log(`Health check: http://${host}:${port}/api/v1/health`);
  });

  // Attempt database connection in background without crashing the server if Supabase is cold-starting
  prisma
    .$connect()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.warn("Database connection notice (server still live):", error?.message || error);
    });

  return server;
}

process.on("SIGINT", async () => {
  await prisma.$disconnect().catch(() => {});
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect().catch(() => {});
  process.exit(0);
});

startServer();
