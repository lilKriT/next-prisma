import { usePrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export const POST = async (request: NextRequest) => {
  // Get cookies and open refresh token
  const token = request.cookies.get("refreshToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token." }, { status: 400 });
  }

  // Check if user exists
  const user = await usePrisma.user.findFirst({
    where: { refreshToken: token },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 400 });
  }

  // Verify refresh token with secret
  const refreshSecret = new TextEncoder().encode(process.env.REFRESH_SECRET);
  const { payload, protectedHeader } = await jwtVerify(
    token,
    refreshSecret,
    {}
  );

  // No need to log now:
  //   console.log("payload: ", payload);
  //   console.log("protectedHeader: ", protectedHeader);

  // If error, return. if db username doesn't match decoded, return
  if (!payload || payload.name !== user.name) {
    return NextResponse.json({ error: "Wrong credentials." }, { status: 400 });
  }

  // Get roles from db
  const role = user.role;

  // Create new access token
  const accessSecret = new TextEncoder().encode(process.env.ACCESS_SECRET);
  const accessToken = await new SignJWT({
    name: user.name,
    role: role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10s")
    .sign(accessSecret);

  // Return roles and access token
  //   return NextResponse.json({ msg: "Refresh" });
  return NextResponse.json({ msg: "Refreshed", accessToken, role });
};

// TODO: shouldn't I also send the cookie again?
