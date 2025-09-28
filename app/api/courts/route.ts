import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Court, Team, Competition, Judge } from "@/lib/models";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  await dbConnect();
  const competitionId = url.searchParams.get('competitionId')!;
  const round = url.searchParams.get('round');
  const q: any = { competitionId };
  if (round) q.round = round;
  const courts = await Court.find(q).sort({ courtNumber: 1 }).lean();
  return NextResponse.json(courts);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { competitionId, round, courtNumber, petitionerTeamId, respondentTeamId, judgesCount, managerName, managerPassword } = body;
  // Create inline judge docs for simplicity (no separate judge creation UI)
  const judges = Array.from({ length: judgesCount || 1 }, (_,i)=> ({
    judgeId: undefined, status: 'Pending', // optional judgeId if you later add judges collection
    name: body[`jName${i}`], citation: body[`jCitation${i}`],
  }));
  const c = await Court.create({
    competitionId, round, courtNumber, petitionerTeamId, respondentTeamId,
    judges, courtManager: { name: managerName, password: managerPassword, status: 'Pending' }
  });
  return NextResponse.json({ ok: true, id: c._id });
}
