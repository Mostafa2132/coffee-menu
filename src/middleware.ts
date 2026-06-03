import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createSupabaseMiddlewareClient(request);

  // Refresh session to keep user logged in
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/dashboard/login";

  if (isLogin && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (isDashboard && !isLogin && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

