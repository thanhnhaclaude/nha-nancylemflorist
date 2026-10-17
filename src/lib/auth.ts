import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "nf_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (32+ characters)");
  return s;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32);
}

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !adminConfigured()) return false;
  // Compare HMACs so the comparison is constant-time regardless of input length.
  return safeEqual(sign(`pw:${input}`), sign(`pw:${expected}`));
}

export function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `admin.${exp}`;
  return { token: `${payload}.${sign(payload)}`, maxAge: MAX_AGE };
}

export function verifySessionToken(token?: string) {
  if (!token || !adminConfigured()) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [who, exp, sig] = parts;
  if (who !== "admin" || !/^\d+$/.test(exp) || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, sign(`${who}.${exp}`));
}

export async function isAdmin() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}
