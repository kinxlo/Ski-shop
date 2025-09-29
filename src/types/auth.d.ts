// NextAuth module augmentation for the Ski Shop application

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: { id: string; name: string } | string;
    // accessToken?: string;
    // refreshToken?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    role?: { id: string; name: string } | string;
    accessToken?: string;
    refreshToken?: string;
  }
}

export {};
