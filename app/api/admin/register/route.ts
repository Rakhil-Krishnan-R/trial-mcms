import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  await dbConnect();
  const exists = await User.findOne({ email });
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: "ADMIN" });
  await setSession({ userId: String(user._id), role: "ADMIN", name: user.name, email: user.email });
  return NextResponse.json({ ok: true });
}
