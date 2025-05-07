import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { NextRequestWithAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequestWithAuth) {
  const { userId, sessionClaims } = auth();

  // Kiểm tra quyền truy cập vào trang quản lý người dùng
  if (req.nextUrl.pathname.startsWith("/admin/users")) {
    if (!userId || sessionClaims?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/users/:path*"]
};