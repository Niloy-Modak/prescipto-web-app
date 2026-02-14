import { DefaultSession, DefaultUser } from "next-auth";

/**
 * Extend NextAuth core types
 */
declare module "next-auth" {
  /**
   * Returned by `authorize()` and stored in JWT
   */
  interface User extends DefaultUser {
    id: string;
    role: "user" | "admin";
    profileImage: string | null;
  }

  /**
   * Available in `useSession()` and `getServerSession()`
   */
  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
      profileImage: string | null;
    } & DefaultSession["user"];
  }
}

/**
 * JWT token
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "admin";
    profileImage: string | null;
  }
}
