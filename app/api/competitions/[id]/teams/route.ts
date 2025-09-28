import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Team } from "@/lib/models";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const teams = await Team.find({ competitionId: params.id }).sort({ teamCode: 1 }).lean();
  return NextResponse.json(teams);
}
