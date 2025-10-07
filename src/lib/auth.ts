import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Try Supabase auth first
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (data.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata?.name || data.user.email,
              image: data.user.user_metadata?.avatar_url,
            };
          }

          // Fallback to Prisma if Supabase auth fails
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });

          if (user && user.password) {
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

            if (isPasswordValid) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image,
              };
            }
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists in Supabase
          const { data: existingUser } = await supabase.auth.admin.getUserById(user.id);

          if (!existingUser.user) {
            // Create user in Supabase if doesn't exist
            const { data, error } = await supabase.auth.admin.createUser({
              id: user.id,
              email: user.email!,
              user_metadata: {
                name: user.name,
                avatar_url: user.image,
              },
            });

            if (error) {
              console.error('Error creating user in Supabase:', error);
              return false;
            }
          }

          // Create or update user in Prisma
          await prisma.user.upsert({
            where: { email: user.email! },
            update: {
              name: user.name,
              image: user.image,
            },
            create: {
              id: user.id,
              email: user.email!,
              name: user.name,
              image: user.image,
            },
          });

          return true;
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }

      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
};

