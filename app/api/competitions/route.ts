import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Competition } from "@/lib/models";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  await dbConnect();
  const items = await Competition.find().select({ name:1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  await dbConnect();
  const c = await Competition.create({ ...data, adminId: session.userId });
  return NextResponse.json({ ok: true, id: c._id });
}
