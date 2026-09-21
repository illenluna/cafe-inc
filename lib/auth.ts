import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "cafe_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8h

function mustGetEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set — copy .env.example to .env.local and fill it in.`);
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", mustGetEnv("SESSION_SECRET")).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [role, expiresAtStr, signature] = token.split(".");
  if (role !== "admin" || !expiresAtStr || !signature) return false;
  if (!safeEqual(sign(`${role}.${expiresAtStr}`), signature)) return false;
  return Date.now() < Number(expiresAtStr);
}

export function verifyAdminPassword(candidate: string): boolean {
  // Compare digests (not raw strings) so branch timing doesn't leak the password's length.
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(mustGetEnv("ADMIN_PASSWORD")).digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function requireAdmin(): Promise<void> {
  const store = await cookies();
  if (!verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value)) {
    throw new Error("Not authenticated");
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_SECONDS;
