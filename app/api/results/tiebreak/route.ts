import { NextRequest, NextResponse } from "next/server";
export async function POST() {
  // This endpoint would re-run ranking using memorial/researcher scores; here it's a stub.
  return new Response(null, { status: 204 });
}
