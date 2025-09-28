import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { JudgeScore, Court } from "@/lib/models";

export async function POST(req: NextRequest) {
  const { courtId, judgeId, scores } = await req.json();
  await dbConnect();
  for (const team of ['Petitioner','Respondent']) {
    await JudgeScore.create({ courtId, judgeId, team, speakerScores: scores[team]||[], submittedAt: new Date() });
  }
  // set judge status completed
  const court = await Court.findById(courtId);
  if (court) {
    court.judges = (court.judges||[]).map((j:any)=> ({ ...j, status: 'Completed' }));
    await court.save();
  }
  return NextResponse.json({ ok: true });
}
