import { clearTokenCookie } from "../../../lib/auth";
export default async function handler(req, res) {
  clearTokenCookie(res);
  res.json({ ok: true });
}
