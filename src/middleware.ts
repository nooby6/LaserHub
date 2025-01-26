import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

// Create matchers for each route in the access map
const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
  try {
    // Await authentication to get session claims
    const { sessionClaims } = await auth();

    // Extract user role from session claims metadata
    const role = (sessionClaims?.metadata as { role?: string })?.role;

    if (!role) {
      // If no role is found, redirect to a default page or login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check route access permissions
    for (const { matcher, allowedRoles } of matchers) {
      if (await matcher(req)) {
        // If the user does not have access, redirect them based on their role
        if (!allowedRoles.includes(role)) {
          return NextResponse.redirect(new URL(`/${role}`, req.url));
        }
      }
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Handle errors gracefully, redirecting to an error page or logging out
    return NextResponse.redirect(new URL("/error", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
