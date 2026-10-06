import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const SHARED_SECRET = process.env.API_JWT_SECRET || "super-secret-default-key";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization for development. 
        // In real app, this should verify against backend API.
        if (credentials?.email && credentials?.password) {
          return { id: "1", name: "Test User", email: credentials.email as string };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // Mint a token that the backend can understand
        token.backendToken = jwt.sign(
          { sub: user.email, name: user.name, id: user.id },
          SHARED_SECRET,
          { expiresIn: "7d" }
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.backendToken = token.backendToken;
      }
      return session;
    },
  },
});
