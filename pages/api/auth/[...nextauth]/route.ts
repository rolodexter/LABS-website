import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import TwitterProvider from 'next-auth/providers/twitter';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify email' } },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    // Custom Telegram Provider
    {
      id: 'telegram',
      name: 'Telegram',
      type: 'oauth',
      // Implement Telegram Login Widget flow
      // This is a simplified version - you'll need to implement the full Telegram Login flow
      authorization: 'https://oauth.telegram.org/auth',
      token: {
        url: 'https://oauth.telegram.org/access_token',
        async request({ client, params, checks, provider }) {
          // Implement Telegram-specific token validation
        },
      },
      userinfo: {
        url: 'https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe',
        async request({ client, tokens }) {
          // Implement Telegram user info retrieval
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          image: profile.photo_url,
        };
      },
    },
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user ID and role to session
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };