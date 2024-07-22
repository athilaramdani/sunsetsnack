import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from 'bcrypt';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          userId: `${existingUser.userId}`,  // Disesuaikan dengan skema revisi
          username: existingUser.username,
          email: existingUser.email,
          nama: existingUser.nama,
          roleToko: existingUser.roleToko,
          no_telp: existingUser.no_telp,
          image: existingUser.image,
          rank: existingUser.rank,
          alamat: existingUser.alamat,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.nama = user.nama;
        token.roleToko = user.roleToko;
        token.no_telp = user.no_telp;
        token.image = user.image;
        token.rank = user.rank;
        token.alamat = user.alamat;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          userId: token.userId,
          username: token.username,
          email: token.email,
          nama: token.nama,
          roleToko: token.roleToko,
          no_telp: token.no_telp,
          image: token.image,
          rank: token.rank,
          alamat: token.alamat,
        };
      }
      return session;
    }
  }
};
