/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// NextAuth module declarations are globally augmented in src/types/*.d.ts

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Support both legacy and new env names for the auth secret in different environments
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? process.env.NEXT_AUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
  // Add trustHost for production deployments
  trustHost: true,
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
            console.error("Google OAuth: No code provided");
            throw new CredentialsSignin("Missing Google authentication data");
          }

          if (!process.env.NEXT_PUBLIC_BASE_URL) {
            console.error("NEXT_PUBLIC_BASE_URL environment variable is not set");
            throw new CredentialsSignin("Backend configuration error");
          }

          const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/google/callback?code=${credentials.code}`;
          console.log("Google OAuth: Making request to backend");

          const response = await axios.get(callbackUrl, {
            timeout: 10_000, // 10 second timeout
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (response.data?.success && response.data?.data?.user) {
            console.log("Google OAuth: Backend authentication successful");
            return {
              id: response.data.data.user.id,
              name: response.data.data.user.fullName,
              email: response.data.data.user.email,
              role: { id: response.data.data.user.role, name: response.data.data.user.role },
              accessToken: response.data.data.tokens.accessToken,
              refreshToken: response.data.data.tokens.refreshToken,
            };
          }

          console.error("Google OAuth: Backend returned unsuccessful response", response.data);
          throw new CredentialsSignin(response.data?.message || "Google authentication failed");
        } catch (error) {
          console.error("Google OAuth error:", error);

          if (axios.isAxiosError(error)) {
            // Handle specific HTTP errors
            if (error.code === "ECONNREFUSED") {
              throw new CredentialsSignin("Backend service is unavailable. Please try again later.");
            }

            if (error.code === "ENOTFOUND") {
              throw new CredentialsSignin("Backend service could not be reached. Please check your connection.");
            }

            if (error.response?.status === 400) {
              throw new CredentialsSignin(error.response?.data?.message || "Invalid authentication request");
            }

            if (error.response?.status === 401) {
              throw new CredentialsSignin("Google authentication was rejected by the server");
            }

            if (error.response?.status === 404) {
              throw new CredentialsSignin("Authentication service not found. Please contact support.");
            }

            if (error.response?.status === 500) {
              throw new CredentialsSignin("Backend service error. Please try again later.");
            }

            if ((error.response?.status ?? 0) >= 500) {
              throw new CredentialsSignin("Server error occurred. Please try again later.");
            }

            const message = error.response?.data?.message || "Google authentication failed";
            throw new CredentialsSignin(message);
          }

          if (error instanceof CredentialsSignin) {
            throw error;
          }

          throw new CredentialsSignin("An unexpected error occurred during Google authentication");
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
        const userAny = user as any;
        const normalizedRole =
          typeof userAny.role === "object"
            ? {
                id: String(userAny.role?.id ?? userAny.role?.name ?? "customer"),
                name: String(userAny.role?.name ?? userAny.role?.id ?? "customer"),
              }
            : String(userAny.role ?? "customer");

        return {
          ...token,
          id: (userAny.id as string) ?? (token as any).id,
          name: (userAny.name as string) ?? (token as any).name,
          email: (userAny.email as string) ?? (token as any).email,
          role: normalizedRole,
          accessToken: (userAny.accessToken as string) ?? (token as any).accessToken,
          refreshToken: (userAny.refreshToken as string) ?? (token as any).refreshToken,
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
          id: (token as any).id as string,
          name: (token as any).name as string,
          email: (token as any).email as string,
          role: (token as any).role,
        },
        accessToken: (token as any).accessToken as string | undefined,
        refreshToken: (token as any).refreshToken as string | undefined,
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
  // Add explicit cookie configuration for production
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
