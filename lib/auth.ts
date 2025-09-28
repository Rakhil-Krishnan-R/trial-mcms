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
  cookies().set(cookieName, token, { httpOnly: true, sameSite: "lax", secure: true, path: "/" });
}

export async function clearSession() {
  cookies().set(cookieName, "", { httpOnly: true, maxAge: 0, path: "/" });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookie = cookies().get(cookieName);
  if (!cookie?.value) return null;
  try {
    const { payload } = await jwtVerify(cookie.value, secret);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
