import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const palettes = await prisma.palette.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(palettes);
  } catch (error) {
    console.error("get palettes error:", error);
    return NextResponse.json({ error: "failed to fetch palettes" }, { status: 500 });
  }
}
