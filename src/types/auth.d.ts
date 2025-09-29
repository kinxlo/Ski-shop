// // NextAuth module augmentation for the Ski Shop application
import type { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     name: string | null;
//     email: string | null;
//     role: { id: string; name: string };
//     accessToken?: string;
//     refreshToken?: string;
//   }

//   interface Session {
//     user: {
//       id: string;
//       role: { id: string; name: string };
//     } & DefaultSession["user"];
//     accessToken?: string;
//     refreshToken?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     name?: string | null;
//     email?: string | null;
//     role?: { id: string; name: string };
//     accessToken?: string;
//     refreshToken?: string;
//   }
// }

// declare module "next-auth/adapters" {
//   interface AdapterUser {
//     role: { id: string; name: string };
//     accessToken?: string;
//     refreshToken?: string;
//   }
// }

// export {};

/**
 * Authentication types for the Ski Shop application
 */

declare global {
  // ============================================================================
  // AUTHENTICATION TYPES
  // ============================================================================

  /** User entity for authentication */
  interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
  }

  /** Authentication tokens */
  interface AuthTokens {
    accessToken: string;
    refreshToken: string;
  }

  /** Authentication response data */
  interface AuthResponseData {
    user: AuthUser;
    tokens: AuthTokens;
  }

  /** User response wrapper */
  interface UserResponse {
    success: boolean;
    data: AuthResponseData;
    error?: string;
  }

  /** NextAuth User interface extension */
  interface NextAuthUser {
    id: string;
    accessToken: string;
    refreshToken: string;
    role: { id: string; name: string };
  }

  /** NextAuth Session interface extension */
  interface NextAuthSession {
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

  /** NextAuth JWT interface extension */
  interface NextAuthJWT {
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

export {};
