import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Court } from "@/lib/models";
import { setSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { courtId, judgeId, password } = await req.json();
  await dbConnect();
  const c: any = await Court.findById(courtId).lean();
  if (!c) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (c.courtManager?.password !== password) return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  const judge = (c.judges||[]).find((j:any)=> String(j.judgeId||j._id) === judgeId || j.name === judgeId);
  if (!judge) return NextResponse.json({ error: 'Not assigned' }, { status: 401 });
  await setSession({ role: 'JUDGE', judgeId, courtId, name: judge.name });
  return NextResponse.json({ ok: true });
}
