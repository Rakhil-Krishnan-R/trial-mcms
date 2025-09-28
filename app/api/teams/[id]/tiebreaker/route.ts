import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Team } from "@/lib/models";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { field, value } = await req.json();
  await dbConnect();
  const t = await Team.findById(params.id);
  if (!t) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!t.tieBreakerScores) t.tieBreakerScores = { memorialScore: 0, researcherTest: 0 };
  (t.tieBreakerScores as any)[field] = value;
  await t.save();
  return NextResponse.json({ ok: true });
}
