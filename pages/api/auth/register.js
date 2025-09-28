import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";
import { signToken, setTokenCookie } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, email, password } = req.body;
  await connectDB();
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: "ADMIN" });
  const token = signToken({ id: user._id, role: user.role });
  setTokenCookie(res, token);
  res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }});
}
