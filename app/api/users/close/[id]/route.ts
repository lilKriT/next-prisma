import { getCredentials } from "@/lib/auth/credentials";
import { usePrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) {
  if (!+id) {
    return NextResponse.json({ error: `No ID` }, { status: 400 });
  }

  const { id: userId, role } = await getCredentials(request);

  if (!role) {
    return NextResponse.json({ error: `No role` }, { status: 400 });
  }

  if (role === "Admin" || (role === "User" && id === userId)) {
    try {
      const userToDelete = await usePrisma.user.findFirst({
        where: { id: +id },
      });
      if (!userToDelete) {
        return NextResponse.json(
          { error: `User you want to delete doesn't exist.` },
          { status: 400 }
        );
      }

      // First remove all the tasks
      await usePrisma.task.deleteMany({ where: { userId: { equals: +id } } });
      await usePrisma.user.delete({ where: { id: +id } });

      revalidatePath("/");
      return NextResponse.json({
        msg: `Deleted ${id}`,
        deletedUser: userToDelete,
      });
    } catch (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
  }

  return NextResponse.json(
    { error: `You're not allowed to delete this user.` },
    { status: 400 }
  );
}
