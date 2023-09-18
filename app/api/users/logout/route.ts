import { usePrisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// TODO: remove cookies on client side too!
export const GET = async (request: NextRequest) => {
  // Get cookies and access refresh token, if none then return
  const token = request.cookies.get("refreshToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token." }, { status: 400 });
  }

  // Find user in db
  // If no user: clear jwt cookie
  // If user: delete refreshToken in db and THEN clear cookie.
  const user = await usePrisma.user.findFirst({
    where: { refreshToken: token },
  });

  if (user) {
    const updatedUser = await usePrisma.user.update({
      where: { name: user.name },
      data: { refreshToken: null },
    });
  }

  const response = NextResponse.json({ msg: "Logged out." });
  response.cookies.delete("refreshToken");
  return response;
};
