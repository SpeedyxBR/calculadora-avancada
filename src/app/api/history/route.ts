import { db } from "@/db/db";   
import { calculations } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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