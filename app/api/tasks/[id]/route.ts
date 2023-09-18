import { getCredentials } from "@/lib/auth/credentials";
import { usePrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  if (!+id) {
    return NextResponse.json({ error: "Task ID invalid." }, { status: 400 });
  }
  const task = await usePrisma.task.findFirst({ where: { id: +id } });

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

  const task = await usePrisma.task.findFirst({ where: { id: +id } });
  if (!task) {
    return NextResponse.json({ error: "Task doesn't exist" }, { status: 400 });
  }

  try {
    const updated = await usePrisma.task.update({
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
  // Testing credentials here.
  const { id: userId, role } = await getCredentials(request);
  // console.log(userId);
  if (!+id) {
    return NextResponse.json({ error: "Task ID invalid." }, { status: 400 });
  }
  if (!userId) {
    return NextResponse.json({ error: "No user ID." }, { status: 400 });
  }

  try {
    // const task = await usePrisma.task.delete({ where: { id: +id } });
    const task = await usePrisma.task.findFirst({ where: { id: +id } });
    if (role === "Admin") {
      await usePrisma.task.delete({ where: { id: +id } });
      revalidatePath("/");
      return NextResponse.json({ task });
    }

    const taskOwner = await usePrisma.user.findFirst({
      where: { tasks: { some: { id: task?.id } } },
    });

    if (taskOwner?.id === userId) {
      await usePrisma.task.delete({ where: { id: +id } });
      revalidatePath("/");
      return NextResponse.json({ task });
    }
    return NextResponse.json(
      { msg: "You must be an admin or the task owner to delete a task." },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
