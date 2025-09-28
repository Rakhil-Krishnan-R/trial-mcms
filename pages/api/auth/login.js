import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { signToken, setTokenCookie } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;
  await connectDB();
  const usr = await User.findOne({ email });
  if (!usr) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, usr.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = signToken({ id: usr._id, role: usr.role });
  setTokenCookie(res, token);
  res.json({ user: { id: usr._id, email: usr.email, name: usr.name }});
}
