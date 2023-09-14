import { usePrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  const { name, password } = await request.json();

  // Do we have credentials?
  if (!name || !password) {
    return NextResponse.json(
      { error: "No credentials provided." },
      { status: 400 }
    );
  }

  // Does user exist?
  const user = await usePrisma.user.findFirst({ where: { name } });
  if (!user) {
    return NextResponse.json(
      { error: "User with this name doesn't exist." },
      { status: 400 }
    );
  }

  // Does password match?
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (passwordMatches) {
    // Get roles
    // Create access token
    // Create refresh token
    // Save refresh token in db
    // Save refresh token as http only cookie
    // Return access token
  } else {
    console.log("No log");
  }
  return NextResponse.json({ msg: "Log In" });
};
