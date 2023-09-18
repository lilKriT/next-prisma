import { NextRequest } from "next/server";
import { usePrisma } from "../prisma";
import { jwtVerify } from "jose";

export const getCredentials = async (request: NextRequest) => {
  // Get cookies and open refresh token
  const token = request.cookies.get("refreshToken")?.value;
  if (!token) {
    return {};
  }

  // Check if user exists
  const user = await usePrisma.user.findFirst({
    where: { refreshToken: token },
  });
  if (!user) {
    return {};
  }

  // Verify refresh token with secret
  const refreshSecret = new TextEncoder().encode(process.env.REFRESH_SECRET);
  const { payload, protectedHeader } = await jwtVerify(
    token,
    refreshSecret,
    {}
  );

  // If error, return. if db username doesn't match decoded, return
  if (!payload || payload.name !== user.name) {
    return {};
  }

  // Get name and roles from db
  const id = user.id;
  const name = user.name;
  const role = user.role;

  return { id, name, role };
};
