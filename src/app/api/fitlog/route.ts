import { NextResponse } from "next/server";
import { FALLBACK_WORKOUTS } from "@/lib/api";

const REMOTE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function GET() {
  try {
    const res = await fetch(REMOTE_URL, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 120 },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
          },
        });
      }
    }

    // Remote worker returned 429 or invalid data, gracefully return fallback
    console.warn("API has some error, using fallback workouts.");
    return NextResponse.json(FALLBACK_WORKOUTS, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch {
    console.warn("API has some error, using fallback workouts.");
    return NextResponse.json(FALLBACK_WORKOUTS, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

