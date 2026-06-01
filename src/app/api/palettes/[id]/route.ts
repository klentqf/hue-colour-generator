import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const palette = await prisma.palette.findUnique({ where: { id } });
    if (!palette) {
      return NextResponse.json({ error: "palette not found" }, { status: 404 });
    }
    return NextResponse.json(palette);
  } catch (error) {
    console.error("get palette error:", error);
    return NextResponse.json({ error: "failed to fetch palette" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.palette.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("delete palette error:", error);
    return NextResponse.json({ error: "failed to delete palette" }, { status: 500 });
  }
}
