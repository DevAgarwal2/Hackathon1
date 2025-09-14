import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://hackathon1-ejks.vercel.app",
});

export const { signIn, signOut, useSession } = authClient;

