import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { JudgeScore, Team } from "@/lib/models";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const competitionId = url.searchParams.get('competitionId')!;
  await dbConnect();
  // simple aggregation: total scores per team code
  const teamDocs = await Team.find({ competitionId }).lean();
  const teamMap: any = Object.fromEntries(teamDocs.map((t:any)=> [String(t._id), t]));
  const scoreDocs = await JudgeScore.find().lean();
  const totals: Record<string, number> = {};
  for (const s of scoreDocs) {
    const teamId = (s.team === 'Petitioner') ? teamDocs.find((t:any)=> String(t._id)===String((s as any).courtId?.petitionerTeamId))?._id : null;
  }
  // naive placeholder: randomize leaderboard
  const leaderboard = teamDocs.slice(0, Math.min(10, teamDocs.length)).map((t:any, i:number)=> ({ rank: i+1, teamCode: t.teamCode, wins: Math.floor(Math.random()*3), totalScore: Math.floor(Math.random()*200), tie: Math.random() < 0.2 }));
  const best = {
    male: [{ rank: 1, name: 'Speaker X', teamCode: teamDocs[0]?.teamCode || '-', score: 95 }],
    female: [{ rank: 1, name: 'Speaker Y', teamCode: teamDocs[1]?.teamCode || '-', score: 93 }],
  };
  return NextResponse.json({ teamLeaderboard: leaderboard, bestSpeakers: best });
}
