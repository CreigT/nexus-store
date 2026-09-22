import { createHmac, timingSafeEqual } from "crypto";
import { config } from "./config";

export type AccessGrant = {
  email: string;
  slugs: string[];
  membership: boolean;
  exp: number;
};

function sign(payload: string) {
  return createHmac("sha256", config.accessSecret).update(payload).digest("hex");
}

export function encodeGrant(grant: AccessGrant): string {
  const payload = Buffer.from(JSON.stringify(grant), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeGrant(token: string | undefined | null): AccessGrant | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const grant = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AccessGrant;
    if (grant.exp < Date.now()) return null;
    return grant;
  } catch {
    return null;
  }
}

export function grantForPurchase(email: string, slug: string, type: "one_time" | "membership") {
  const days = type === "membership" ? 365 : 3650;
  return encodeGrant({
    email,
    slugs: [slug],
    membership: type === "membership",
    exp: Date.now() + days * 24 * 60 * 60 * 1000,
  });
}

export function canAccess(grant: AccessGrant | null, slug?: string) {
  if (!grant) return false;
  if (grant.membership) return true;
  if (!slug) return grant.slugs.length > 0;
  return grant.slugs.includes(slug);
}
