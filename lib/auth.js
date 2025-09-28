import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

export function signToken(payload, opts = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: opts.expiresIn || "8h" });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function setTokenCookie(res, token) {
  res.setHeader("Set-Cookie", cookie.serialize("mcms_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  }));
}

export function clearTokenCookie(res) {
  res.setHeader("Set-Cookie", cookie.serialize("mcms_token", "", {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0
  }));
}
