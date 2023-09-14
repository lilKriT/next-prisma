import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const json = await request.json();
  if (!json.title || !json.userId) {
    return NextResponse.json({ message: "Missing data." }, { status: 400 });
  }

  const user = await prisma.user.findFirst({ where: { id: json.userId } });
  if (!user) {
    return NextResponse.json(
      { message: "User doesn't exist." },
      { status: 400 }
    );
  }

  try {
    const task = await prisma.task.create({ data: json });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
