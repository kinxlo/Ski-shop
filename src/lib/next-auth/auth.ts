/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    role: { id: string; name: string };
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: { id: string; name: string };
    } & DefaultSession["user"];
    accessToken: string;
    refreshToken: string;
    expires: string;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role: { id: string; name: string };
    accessToken: string;
    refreshToken: string;
    iat: number;
    exp: number;
    jti: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
  providers: [
    // Google OAuth via credentials provider
    Credentials({
      id: "google",
      name: "Google",
      credentials: {
        code: { type: "text" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.code) {
            throw new CredentialsSignin("Missing Google authentication data");
          }
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/google/callback?code=${credentials.code}`,
          );

          if (response.data.success) {
            console.log("Google OAuth successful, returning user data");
            return {
              id: response.data.data.user.id,
              name: response.data.data.user.fullName,
              email: response.data.data.user.email,
              role: { id: response.data.data.user.role, name: response.data.data.user.role },
              accessToken: response.data.data.tokens.accessToken,
              refreshToken: response.data.data.tokens.refreshToken,
            };
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log("Google OAuth error:", error.response?.data || error.message);
            const message = error.response?.data?.message || "Google authentication failed";
            throw new CredentialsSignin(message);
          }
          console.log("Google OAuth unexpected error:", error);
          throw new CredentialsSignin("Google authentication failed");
        }
      },
    }),

    // conventional credentials
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/password`, {
            email,
            password,
          });

          if (response.status === 200) {
            return {
              id: response.data.data.user.id,
              name: response.data.data.user.fullName,
              email: response.data.data.user.email,
              role: { id: response.data.data.user.role, name: response.data.data.user.role },
              accessToken: response.data.data.tokens.accessToken,
              refreshToken: response.data.data.tokens.refreshToken,
            };
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Invalid email or password";
            throw new CredentialsSignin(message);
          }
          throw new CredentialsSignin("Login failed. Please try again.");
        }
        throw new CredentialsSignin("Login failed. Please try again.");
      },
    }),
  ],
  callbacks: {
    authorized() {
      // Let the middleware handle all authorization logic
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      // Update triggered from client
      if (trigger === "update" && session) {
        return {
          ...token,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        };
      }

      return token;
    },

    session({ session, token }): Promise<any> {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expires: session.expires,
      });
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
});
