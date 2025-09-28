import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Competition, Team } from "@/lib/models";
import { generateTeamCodes } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const competitionId = url.searchParams.get('competitionId')!;
  await dbConnect();
  const comp = await Competition.findById(competitionId).lean();
  if (!comp) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const codes = generateTeamCodes(comp.teamPrefix || 'TEAM', comp.numberOfTeams || 0);
  for (const code of codes) {
    const exists = await Team.findOne({ competitionId, teamCode: code });
    if (!exists) await Team.create({ competitionId, teamCode: code, speakers: [{ role: 'Speaker 1' }, { role: 'Speaker 2' }] });
  }
  return NextResponse.redirect(new URL(`/admin/competitions/${competitionId}/teams`, req.url));
}
