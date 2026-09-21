import { NextResponse, type NextRequest } from "next/server";
import { getAvailabilityForDate } from "@/lib/reservations";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("data");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Parâmetro 'data' inválido — use o formato AAAA-MM-DD." }, { status: 400 });
  }

  const availability = await getAvailabilityForDate(date);
  return NextResponse.json(availability, { headers: { "Cache-Control": "no-store" } });
}
