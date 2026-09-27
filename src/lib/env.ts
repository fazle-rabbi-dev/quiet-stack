export const username = process.env.ADMIN_USERNAME ?? "rabbi";
export const password = process.env.ADMIN_PASSWORD ?? "rabbi";

// JWT secret - used for signing access / refresh tokens
export const jwtSecret =
  process.env.JWT_SECRET ?? "dev-jwt-secret-please-set-JWT_SECRET-in-env";

// Token lifetimes
export const accessTokenExpiry = "1h";
export const refreshTokenExpiry = "7d";

// MongoDB - connection string for blog posts, likes
export const mongodbUri = process.env.MONGODB_URI ?? "";

export const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
