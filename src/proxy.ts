import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

import { accessTokenExpiry, jwtSecret } from "@/lib/env";

const secret = new TextEncoder().encode(jwtSecret);

type TokenPayload = {
  inputUser: string;
  type: string;
};

async function readToken(
  token: string | undefined,
  type: string
): Promise<TokenPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    if (payload.type !== type || !payload.inputUser) return null;
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access = await readToken(
    request.cookies.get("access-token")?.value,
    "access"
  );

  // Authed user hitting login -> send to dashboard
  if (pathname === "/admin/login") {
    if (access) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    // turn off let token refresh happen on admin/login revisit
    // return NextResponse.next();
  }

  // Valid access token -> allow through
  if (access) return NextResponse.next();

  // Expired access -> try silent refresh
  const refresh = await readToken(
    request.cookies.get("refresh-token")?.value,
    "refresh"
  );

  if (refresh) {
    const renewed = await new SignJWT({
      inputUser: refresh.inputUser,
      type: "access",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(accessTokenExpiry)
      .sign(secret);

    // Redirect carries the renewed cookie when on login, otherwise continue
    const res =
      pathname === "/admin/login"
        ? NextResponse.redirect(new URL("/admin/dashboard", request.url))
        : NextResponse.next();
    res.cookies.set("access-token", renewed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1h, matches accessTokenExpiry
    });

    return res;
  }

  // No valid tokens: let the login page itself render,
  // APIs get JSON 401, other pages redirect to login
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin/api")) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/api/:path*", "/admin/login"],
};
