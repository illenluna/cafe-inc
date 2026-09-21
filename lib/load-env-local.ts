import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// next dev/build/start load .env.local automatically; the standalone Prisma CLI
// and tsx scripts (prisma.config.ts, prisma/seed.ts) don't, so they import this first.
export function loadEnvLocal(): void {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^"|"$/g, "");
  }
}
