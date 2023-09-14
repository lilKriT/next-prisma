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

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  if (!+id) {
    return NextResponse.json({ error: "Task ID invalid." }, { status: 400 });
  }

  const json = await request.json();
  if (JSON.stringify(json) === "{}") {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const task = await prisma.task.findFirst({ where: { id: +id } });
  if (!task) {
    return NextResponse.json({ error: "Task doesn't exist" }, { status: 400 });
  }

  try {
    const updated = await prisma.task.update({
      where: { id: +id },
      data: json,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  if (!+id) {
    return NextResponse.json({ error: "Task ID invalid." }, { status: 400 });
  }
  try {
    const task = await prisma.task.delete({ where: { id: +id } });
    return NextResponse.json({ task });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
