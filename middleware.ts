import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// const protectedRoutes = [];

const middleware = authMiddleware({
  afterAuth(auth, req, evt) {
    const protectedRoutes = [
      "/",
      "/upcoming",
      "/previous",
      "/recordings",
      "/personal-room",
      "/meeting(.*)",
    ];
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    } else if (protectedRoutes.includes(req.url) && !auth.userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    return NextResponse.next();
  },
});

export default middleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
