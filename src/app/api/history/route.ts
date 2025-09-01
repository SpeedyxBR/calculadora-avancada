// src/app/api/history/route.ts
import { db } from "@/db/db";
import { calculations } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if database is available
    if (!db) {
      return NextResponse.json({
        history: [],
        message: "Database not configured. History is temporarily unavailable.",
      });
    }

    const history = await db.select().from(calculations);
    return NextResponse.json({ history });
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return NextResponse.json(
      { message: "Error fetching history." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { expression, result } = body;

    if (!expression || !result) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Check if database is available
    if (!db) {
      return NextResponse.json({
        success: false,
        message: "Database not configured. Cannot save calculation.",
      });
    }

    const newCalculation = await db
      .insert(calculations)
      .values({
        expression,
        result,
      })
      .returning();

    return NextResponse.json({ success: true, calculation: newCalculation[0] });
  } catch (error) {
    console.error("Failed to save calculation:", error);
    return NextResponse.json(
      { message: "Error saving calculation." },
      { status: 500 }
    );
  }
}
