import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Court, Team, Competition } from "@/lib/models";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const courtId = url.searchParams.get('courtId')!;
  const judgeId = url.searchParams.get('judgeId')!;
  await dbConnect();
  const c: any = await Court.findById(courtId).lean();
  const comp: any = await Competition.findById(c.competitionId).lean();
  const petitioner = await Team.findById(c.petitionerTeamId).lean();
  const respondent = await Team.findById(c.respondentTeamId).lean();
  return NextResponse.json({
    competition: { name: comp.name }, court: { courtNumber: c.courtNumber, round: c.round },
    scoringRubric: comp.scoringRubric,
    petitionerSpeakers: petitioner?.speakers || [],
    respondentSpeakers: respondent?.speakers || [],
  });
}
