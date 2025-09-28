import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Competition } from "@/lib/models";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const c = await Competition.findById(params.id).lean();
  return NextResponse.json(c);
}
