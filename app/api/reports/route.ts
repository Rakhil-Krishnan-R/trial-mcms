import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { JudgeScore, Court, Team } from "@/lib/models";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const courtId = url.searchParams.get('courtId')!;
  const team = url.searchParams.get('team');
  await dbConnect();
  const scores = await JudgeScore.find({ courtId, ...(team? { team }: {}) }).lean();
  const rows = scores.flatMap((s:any)=> s.speakerScores.map((x:any)=> ({ team: s.team, speaker: x.speakerName, criterion: x.criterion, score: x.score })));
  const columns = [{ header: 'Team', dataKey: 'team' }, { header: 'Speaker', dataKey: 'speaker' }, { header: 'Criterion', dataKey: 'criterion' }, { header: 'Score', dataKey: 'score' }];
  return NextResponse.json({ columns, rows });
}
