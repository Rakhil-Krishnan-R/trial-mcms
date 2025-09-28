import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "dev_secret_change_me");
const cookieName = "mcms_session";

export type SessionPayload = {
  userId?: string;
  role?: "ADMIN" | "SUPERADMIN" | "JUDGE" | "MANAGER";
  judgeId?: string;
  courtId?: string;
  name?: string;
  email?: string;
};

export async function setSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);

  cookies().set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // ✅ dev-safe
    path: "/",
    maxAge: 60 * 60 * 8, // ✅ 8h in seconds
  });
}

export async function clearSession() {
  cookies().set(cookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies(); // ❌ only works server-side
    const cookie = cookieStore?.get(cookieName);
    if (!cookie?.value) return null;
    const { payload } = await jwtVerify(cookie.value, secret);
    return payload as SessionPayload;
  } catch {
    // fallback for client calls
    return null;
  }
}

