import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { ManagerTimesheet, Court } from "@/lib/models";

export async function POST(req: NextRequest) {
  const { courtId, allocations } = await req.json();
  await dbConnect();
  await ManagerTimesheet.create({ courtId, allocations, submittedAt: new Date(), timeLogs: [] });
  const court = await Court.findById(courtId);
  if (court) { (court as any).courtManager.status = 'Completed'; await court.save(); }
  return NextResponse.json({ ok: true });
}
