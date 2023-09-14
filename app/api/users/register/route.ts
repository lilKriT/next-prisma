import { usePrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  const json = await request.json();
  console.log(json);

  if (!json.name || !json.password) {
    return NextResponse.json({ error: "Provide all data." }, { status: 400 });
  }

  // I think I can skip on finding if user exists?
  try {
    const hashed = await bcrypt.hash(json.password, 10);
    const userData = { name: json.name, password: hashed };

    const user = await usePrisma.user.create({ data: userData });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};

// TODO: add tokens?
