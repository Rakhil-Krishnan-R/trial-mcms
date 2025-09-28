import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Court, Team } from "@/lib/models";

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ await params
  await dbConnect();
  const c: any = await Court.findById(id).lean();
  if (!c) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const petitioner = await Team.findById(c.petitionerTeamId).lean();
  const respondent = await Team.findById(c.respondentTeamId).lean();
  c.petitioner = petitioner;
  c.respondent = respondent;
  return NextResponse.json(c);
}

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ await params
  await dbConnect();
  await Court.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
