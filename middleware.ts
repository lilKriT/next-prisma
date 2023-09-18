import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // let cookies = request.cookies.getAll();
  let refreshToken = request.cookies.get("refreshToken");

  // We have refresh token, aka logged in:
  if (refreshToken) {
    const redirectFrom = ["/login", "/register"];
    if (redirectFrom.includes(request.nextUrl.pathname)) {
      console.log("User logged in, no point!");
      // return NextResponse.rewrite(new URL("/", request.url));
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // This is very important, otherwise there will be a reload every navigation!
  // Apparently I don't know if this is the problem.
  return NextResponse.next();
}
