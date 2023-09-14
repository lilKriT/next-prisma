import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  if (!+id) {
    return NextResponse.json({ error: "Task ID invalid." }, { status: 400 });
  }
  const task = await prisma.task.findFirst({ where: { id: +id } });

  return NextResponse.json({ task });
}
