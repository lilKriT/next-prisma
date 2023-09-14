import { usePrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  console.log(json);

  // I think I can skip on finding if user exists?
  try {
    const user = await usePrisma.user.create({ data: json });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};
