import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Court, Team } from "@/lib/models";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const c: any = await Court.findById(params.id).lean();
  if (!c) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const petitioner = await Team.findById(c.petitionerTeamId).lean();
  const respondent = await Team.findById(c.respondentTeamId).lean();
  c.petitioner = petitioner;
  c.respondent = respondent;
  return NextResponse.json(c);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  await Court.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
