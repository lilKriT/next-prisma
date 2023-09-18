import { getCredentials } from "@/lib/auth/credentials";
import { usePrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tasks = await usePrisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const json = await request.json();
  if (!json.title || !json.userId) {
    return NextResponse.json({ message: "Missing data." }, { status: 400 });
  }

  const user = await usePrisma.user.findFirst({ where: { id: json.userId } });

  const { id, role } = await getCredentials(request);

  if (!user) {
    return NextResponse.json(
      { message: "User doesn't exist." },
      { status: 400 }
    );
  }

  if (role === "Admin" || user.id === id) {
    try {
      const task = await usePrisma.task.create({ data: json });
      revalidatePath("/");
      return NextResponse.json(task);
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
  }

  return NextResponse.json(
    { message: "You don't have necessary privileges." },
    { status: 400 }
  );
}
