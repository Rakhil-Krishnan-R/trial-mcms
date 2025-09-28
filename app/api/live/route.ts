import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Court, Team } from "@/lib/models";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const competitionId = url.searchParams.get('competitionId')!;
  const round = url.searchParams.get('round')!;
  await dbConnect();
  const courts: any[] = await Court.find({ competitionId, round }).sort({ courtNumber: 1 }).lean();
  for (const c of courts) {
    c.petitioner = await Team.findById(c.petitionerTeamId).lean();
    c.respondent = await Team.findById(c.respondentTeamId).lean();
    // map judge inline details
    c.judges = (c.judges||[]).map((j:any)=> ({ ...j, name: j.name || j.citation || 'Judge' }));
  }
  return NextResponse.json(courts);
}
