import { usePrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

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
    const role = user.role;

    // Create access token
    const accessSecret = new TextEncoder().encode(process.env.ACCESS_SECRET);
    const accessToken = await new SignJWT({
      name: user.name,
      role: role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10s") // whether it's 10s or 10m, the flashes happen immediately!
      .sign(accessSecret);

    // Create refresh token
    const refreshSecret = new TextEncoder().encode(process.env.REFRESH_SECRET);
    const refreshToken = await new SignJWT({
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(refreshSecret);

    // Save refresh token in db
    await usePrisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
      },
    });

    // Save refresh token as http only cookie
    const cookieStore = cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    // Do I need other options, like "secure" or "path"?
    // Return access token
    return NextResponse.json({ msg: "Logged in.", accessToken, role });
  } else {
    return NextResponse.json({ error: "Invalid password." }, { status: 400 });
  }
};
