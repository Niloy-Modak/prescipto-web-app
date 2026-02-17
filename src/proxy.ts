import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    const isAdminRoute =
      path.startsWith("/appointments-list") ||
      path.startsWith("/add-doctor") ||
      path.startsWith("/added-doctors");

    const isSharedRoute =
      path.startsWith("/user") || path.startsWith("/appointments");

    // -------------------
    // 1️⃣ Guest redirect
    // -------------------
    if (!token) {
      // Guests -> redirect to "/sign-in" for all protected routes
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // -------------------
    // 2️⃣ Admin-only routes
    // -------------------
    if (isAdminRoute && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // -------------------
    // 3️⃣ Shared routes (user or admin)
    // -------------------
    const hasValidRole = token.role === "admin" || token.role === "user";
    if (isSharedRoute && !hasValidRole) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Always allow token to exist; guests handled inside middleware
      authorized: ({ token }) => true,
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
);

export const config = {
  matcher: [
    "/appointments-list/:path*",
    "/add-doctor/:path*",
    "/added-doctors/:path*",
    "/user/:path*",
    "/appointments/:path*",
  ],
};
