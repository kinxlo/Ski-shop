/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios from "axios";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// // NextAuth module declarations are globally augmented in src/types/*.d.ts

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   // Support both legacy and new env names for the auth secret in different environments
//   secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? process.env.NEXT_AUTH_SECRET,
//   // debug: process.env.NODE_ENV === "development",
//   // Add trustHost for production deployments
//   trustHost: true,
//   providers: [
//     // Google OAuth via credentials provider
//     Credentials({
//       id: "google",
//       name: "Google",
//       credentials: {
//         code: { type: "text" },
//       },
//       authorize: async (credentials) => {
//         try {
//           if (!credentials.code) {
//             console.error("Google OAuth: No code provided");
//             throw new CredentialsSignin("Missing Google authentication data");
//           }

//           if (!process.env.NEXT_PUBLIC_BASE_URL) {
//             console.error("NEXT_PUBLIC_BASE_URL environment variable is not set");
//             throw new CredentialsSignin("Backend configuration error");
//           }

//           const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/google/callback?code=${credentials.code}`;
//           console.log("Google OAuth: Making request to backend");

//           const response = await axios.get(callbackUrl, {
//             timeout: 10_000, // 10 second timeout
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           });

//           if (response.data?.success && response.data?.data?.user) {
//             console.log("Google OAuth: Backend authentication successful");
//             return {
//               id: response.data.data.user.id,
//               name: response.data.data.user.fullName,
//               email: response.data.data.user.email,
//               role: { id: String(response.data.data.user.role), name: String(response.data.data.user.role) },
//               accessToken: response.data.data.tokens.accessToken,
//               refreshToken: response.data.data.tokens.refreshToken,
//             };
//           }

//           console.error("Google OAuth: Backend returned unsuccessful response", response.data);
//           throw new CredentialsSignin(response.data?.message || "Google authentication failed");
//         } catch (error) {
//           console.error("Google OAuth error:", error);

//           if (axios.isAxiosError(error)) {
//             // Handle specific HTTP errors
//             if (error.code === "ECONNREFUSED") {
//               throw new CredentialsSignin("Backend service is unavailable. Please try again later.");
//             }

//             if (error.code === "ENOTFOUND") {
//               throw new CredentialsSignin("Backend service could not be reached. Please check your connection.");
//             }

//             if (error.response?.status === 400) {
//               throw new CredentialsSignin(error.response?.data?.message || "Invalid authentication request");
//             }

//             if (error.response?.status === 401) {
//               throw new CredentialsSignin("Google authentication was rejected by the server");
//             }

//             if (error.response?.status === 404) {
//               throw new CredentialsSignin("Authentication service not found. Please contact support.");
//             }

//             if (error.response?.status === 500) {
//               throw new CredentialsSignin("Backend service error. Please try again later.");
//             }

//             if ((error.response?.status ?? 0) >= 500) {
//               throw new CredentialsSignin("Server error occurred. Please try again later.");
//             }

//             const message = error.response?.data?.message || "Google authentication failed";
//             throw new CredentialsSignin(message);
//           }

//           if (error instanceof CredentialsSignin) {
//             throw error;
//           }

//           throw new CredentialsSignin("An unexpected error occurred during Google authentication");
//         }
//       },
//     }),

//     // conventional credentials
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         const { email, password } = credentials;
//         if (!email || !password) {
//           throw new CredentialsSignin("Please provide both email and password");
//         }

//         try {
//           const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/password`, {
//             email,
//             password,
//           });
//           if (response.status === 200) {
//             return {
//               id: response.data.data.user.id,
//               name: response.data.data.user.fullName,
//               email: response.data.data.user.email,
//               role: { id: String(response.data.data.user.role), name: String(response.data.data.user.role) },
//               accessToken: response.data.data.tokens.accessToken,
//               refreshToken: response.data.data.tokens.refreshToken,
//             };
//           }
//           return null;
//         } catch (error) {
//           if (axios.isAxiosError(error)) {
//             const message = error.response?.data?.message || "Invalid email or password";
//             throw new CredentialsSignin(message);
//           }
//           throw new CredentialsSignin("Login failed. Please try again.");
//         }
//         throw new CredentialsSignin("Login failed. Please try again.");
//       },
//     }),
//   ],
//   callbacks: {
//     authorized() {
//       // Let the middleware handle all authorization logic
//       return true;
//     },

//     async jwt({ token, user, trigger, session }) {
//       type AppRole = { id: string; name: string };
//       type AppUser = {
//         id: string;
//         name: string | null;
//         email: string | null;
//         role: AppRole;
//         accessToken?: string;
//         refreshToken?: string;
//       };
//       // Initial sign in
//       if (user) {
//         const u = user as AppUser;
//         return {
//           ...token,
//           id: u.id,
//           name: u.name,
//           email: u.email,
//           role: u.role,
//           accessToken: u.accessToken,
//           refreshToken: u.refreshToken,
//         };
//       }

//       // Update triggered from client
//       if (trigger === "update" && session) {
//         return {
//           ...token,
//           accessToken: session.accessToken,
//           refreshToken: session.refreshToken,
//         };
//       }

//       return token;
//     },

//     session({ session, token }) {
//       type AppRole = { id: string; name: string };
//       const t = token as import("next-auth/jwt").JWT;
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: (t.id as string) ?? session.user.id,
//           name: (t.name as string | null) ?? session.user.name,
//           email: (t.email as string | null) ?? session.user.email,
//           role: (t.role as AppRole) ?? { id: "customer", name: "customer" },
//         },
//         accessToken: t.accessToken,
//         refreshToken: t.refreshToken,
//         expires: session.expires,
//       } as typeof session & { accessToken?: string; refreshToken?: string };
//     },
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60,
//     updateAge: 60 * 60,
//   },
//   pages: {
//     signIn: "/login",
//   },
//   // Add explicit cookie configuration for production
//   cookies: {
//     sessionToken: {
//       name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//   },
// });

// NextAuth module declarations are now globally available in src/types/
declare module "next-auth" {
  interface User extends NextAuthUser {}
  interface Session extends NextAuthSession {}
  interface JWT extends NextAuthJWT {}
}

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
            throw new CredentialsSignin("Missing Google authentication data");
          }

          if (!process.env.NEXT_PUBLIC_BASE_URL) {
            console.error("NEXT_PUBLIC_BASE_URL environment variable is not set");
            throw new CredentialsSignin("Backend configuration error");
          }

          const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/oauth/google/callback?code=${credentials.code}`;
          console.log("Google OAuth callback URL:", callbackUrl);

          const response = await axios.get(callbackUrl);

          if (response.data.success) {
            console.log("Google OAuth successful, returning user data");
            console.log("User role from backend:", response.data.data.user.role);
            console.log("Full response data:", response.data.data);
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
            console.log("Google OAuth error status:", error.response?.status);
            console.log("Google OAuth error statusText:", error.response?.statusText);

            // Handle specific HTTP errors
            if (error.response?.status === 404) {
              throw new CredentialsSignin("Backend service not found. Please check your configuration.");
            }
            if (error.response?.status === 500) {
              throw new CredentialsSignin("Backend service error. Please try again later.");
            }

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
      // Helpers are defined inside the callback to keep file-wide changes minimal
      const ACCESS_TOKEN_FALLBACK_MS = 15 * 60 * 1000;
      const SAFETY_WINDOW_MS = 60 * 1000;

      const getAccessTokenExpiry = (jwt?: string): number => {
        if (!jwt) return Date.now() + ACCESS_TOKEN_FALLBACK_MS;
        try {
          const [, payload] = jwt.split(".");
          if (!payload) return Date.now() + ACCESS_TOKEN_FALLBACK_MS;
          // NextAuth callbacks run on the server - Buffer is available
          const b64 = payload.replaceAll("-", "+").replaceAll("_", "/");
          const decoded = Buffer.from(b64, "base64").toString("utf8");
          const parsed = JSON.parse(decoded) as { exp?: number };
          return parsed?.exp ? Number(parsed.exp) * 1000 : Date.now() + ACCESS_TOKEN_FALLBACK_MS;
        } catch {
          return Date.now() + ACCESS_TOKEN_FALLBACK_MS;
        }
      };

      const refreshAccessToken = async (rt: string) => {
        const base = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ?? "";
        const url = `${base}/auth/refresh`;
        const resp = await axios.post(url, { refreshToken: rt });

        // Accept common response shapes:
        // { success: true, data: { accessToken, refreshToken } }
        // { success: true, data: { tokens: { accessToken, refreshToken } } }
        // Or flattened variants
        const body = resp?.data ?? {};
        const data = body.data ?? body;
        const tokens = data.tokens ?? data;

        const newAccess = tokens?.accessToken as string | undefined;
        const newRefresh = (tokens?.refreshToken as string | undefined) ?? rt;

        if (!newAccess) {
          throw new Error("No accessToken in refresh response");
        }

        return {
          accessToken: newAccess,
          refreshToken: newRefresh,
          expiresAt: getAccessTokenExpiry(newAccess),
        };
      };

      // Initial sign in
      if (user) {
        const role =
          typeof (user as any).role === "object"
            ? {
                id: String(((user as any).role as any)?.id ?? ((user as any).role as any)?.name ?? "customer"),
                name: String(((user as any).role as any)?.name ?? ((user as any).role as any)?.id ?? "customer"),
              }
            : String((user as any).role ?? "customer");

        const accessToken = (user as any).accessToken as string | undefined;
        const refreshToken = (user as any).refreshToken as string | undefined;

        return {
          ...token,
          id: (user as any).id,
          name: user.name,
          email: user.email,
          role,
          accessToken,
          refreshToken,
          accessTokenExpires: getAccessTokenExpiry(accessToken),
          error: undefined,
        };
      }

      // Update triggered from client
      if (trigger === "update" && session) {
        const accessToken = (session as any).accessToken as string | undefined;
        const refreshToken = (session as any).refreshToken as string | undefined;
        return {
          ...token,
          accessToken,
          refreshToken: refreshToken ?? (token as any).refreshToken,
          accessTokenExpires: accessToken ? getAccessTokenExpiry(accessToken) : (token as any).accessTokenExpires,
          error: undefined,
        };
      }

      // Subsequent calls: if token not near expiry, return as-is
      const accessTokenExpires = (token as any).accessTokenExpires as number | undefined;
      if (accessTokenExpires && Date.now() + SAFETY_WINDOW_MS < accessTokenExpires) {
        return token;
      }

      // If no refresh token, nothing we can do
      const rt = (token as any).refreshToken as string | undefined;
      if (!rt) {
        return token;
      }

      // Try to refresh
      try {
        const refreshed = await refreshAccessToken(rt);
        return {
          ...token,
          accessToken: refreshed.accessToken,
          refreshToken: refreshed.refreshToken ?? (token as any).refreshToken,
          accessTokenExpires: refreshed.expiresAt ?? Date.now() + ACCESS_TOKEN_FALLBACK_MS,
          error: undefined,
        };
      } catch {
        // Signal to the client that re-authentication is needed
        return { ...token, error: "RefreshAccessTokenError" as const };
      }
    },

    session({ session, token }): Promise<any> {
      console.log("Session callback - Token:", token);
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: (token as any).role,
        },
        accessToken: (token as any).accessToken,
        refreshToken: (token as any).refreshToken,
        error: (token as any).error,
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
