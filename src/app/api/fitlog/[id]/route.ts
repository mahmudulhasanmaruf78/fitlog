import { NextRequest, NextResponse } from "next/server";
import { FALLBACK_WORKOUTS } from "@/lib/api";

const REMOTE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  try {
    const res = await fetch(`${REMOTE_URL}/${numericId}`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        return NextResponse.json(data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
          },
        });
      }
    }

    console.warn("API has some error, using fallback workout data.");
    const fallback = FALLBACK_WORKOUTS.find((w) => w.id === numericId);
    if (!fallback) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }
    return NextResponse.json(fallback, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch {
    console.warn("API has some error, using fallback workout data.");
    const fallback = FALLBACK_WORKOUTS.find((w) => w.id === numericId);
    if (!fallback) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 });
    }
    return NextResponse.json(fallback, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

