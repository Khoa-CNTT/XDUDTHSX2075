import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)", 
  "/api/stripe-webhook",
]);

const isAdminRoute = createRouteMatcher([
  "/resume-management(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  // Kiểm tra route công khai
  if (isPublicRoute(request)) {
    return;
  }

  // Bảo vệ tất cả các route không công khai
  await auth.protect();

  // Kiểm tra quyền admin cho các route admin
  if (isAdminRoute(request)) {
    const { sessionClaims } = auth;
    if (sessionClaims?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 403 });
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};