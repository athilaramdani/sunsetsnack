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
        identifier: { label: "Username/Email/Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        let user;
        if (credentials.identifierType === 'email') {
          user = await prisma.user.findUnique({
            where: { email: credentials.identifier },
          });
        } else if (credentials.identifierType === 'phone') {
          user = await prisma.user.findUnique({
            where: { no_telp: credentials.identifier },
          });
        } else {
          user = await prisma.user.findUnique({
            where: { username: credentials.identifier },
          });
        }

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          userId: `${user.userId}`,
          username: user.username,
          email: user.email,
          nama: user.nama,
          roleToko: user.roleToko,
          no_telp: user.no_telp,
          image: user.image,
          rank: user.rank,
          alamat: user.alamat,
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
