"use server";

// need to check what happens when i import jwt and use in proxy

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import {
  accessTokenExpiry,
  refreshTokenExpiry,
  password,
  username,
  jwtSecret,
} from "@/lib/env";
import { logger } from "@/lib/logger";
import { redirect } from "next/navigation";

export type LoginState = {
  ok: boolean;
  error: string | undefined;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const inputUser = String(formData.get("username") ?? "")
    .toString()
    .trim();
  const inputPass = String(formData.get("password") ?? "")
    .toString()
    .trim();

  if (!inputUser || !inputPass) {
    return { ok: false, error: "Username and password are required." };
  }

  // Validate against env credentials
  if (inputUser !== username || inputPass !== password) {
    logger.warn("Failed login attempt for user:", inputUser + inputPass);
    return { ok: false, error: "Invalid username or password." };
  }

  const accessToken = jwt.sign({ inputUser, type: "access" }, jwtSecret, {
    expiresIn: accessTokenExpiry,
  });
  const refreshToken = jwt.sign({ inputUser, type: "refresh" }, jwtSecret, {
    expiresIn: refreshTokenExpiry,
  });

  const jar = await cookies();

  // Access token - short lived
  jar.set("access-token", accessToken, {
    httpOnly: true,
    // ? is this env by default exists in node and vercel
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1h, matches accessTokenExpiry
  });

  // Refresh token - long lived
  jar.set("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  logger.info("Admin login success:", inputUser);
  return { ok: true, error: undefined };
}

// cookies() returns request cookies
export async function getAuthUser() {
  const jar = await cookies();
  const token = jar.get("access-token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      inputUser: string;
      type: string;
    };
    return payload.type === "access" && !!payload.inputUser;
  } catch {
    return null;
  }
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete("access-token");
  jar.delete("refresh-token");

  redirect("/");
}
