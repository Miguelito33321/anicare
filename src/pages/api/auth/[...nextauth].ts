import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function sha256Hex(value: string) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

// NOTE:
// - Este handler es para el Pages Router: /pages/api/auth/[...nextauth].ts
// - En este repo tambien se usa App Router (src/app). Si vas a usar NextAuth
//   en App Router, conviene migrarlo a: src/app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contrasena", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase() ?? "";
        const password = credentials?.password ?? "";

        const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();

        // Recomendado: configurar ADMIN_PASSWORD_SHA256 (hash hex) en vez de password en claro.
        const adminPasswordSha256 = (process.env.ADMIN_PASSWORD_SHA256 ?? "").trim().toLowerCase();
        const adminPasswordPlain = process.env.ADMIN_PASSWORD ?? "";

        if (!adminEmail) return null;
        if (!email || !password) return null;
        if (email !== adminEmail) return null;

        if (adminPasswordSha256) {
          const incomingHash = sha256Hex(password);
          if (!safeEqual(incomingHash, adminPasswordSha256)) return null;
        } else {
          if (!adminPasswordPlain) return null;
          if (!safeEqual(password, adminPasswordPlain)) return null;
        }

        return {
          id: "admin",
          name: "Admin",
          email: adminEmail
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as unknown as { role?: string }).role = "admin";
      }
      return token;
    },
    async session({ session, token }) {
      (session as unknown as { role?: string }).role = (token as unknown as { role?: string }).role;
      return session;
    }
  }
};

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}
