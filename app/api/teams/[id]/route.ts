import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Team } from "@/lib/models";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const t = await Team.findById(params.id).lean();
  return NextResponse.json(t);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  await dbConnect();
  await Team.findByIdAndUpdate(params.id, body);
  return NextResponse.json({ ok: true });
}
