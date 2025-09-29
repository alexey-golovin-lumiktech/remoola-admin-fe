import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = [`/`, `/users`, `/contractors`, `/contracts`, `/payments`, `/documents`];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const hasAccess = req.cookies.get(`access_token`);
  const isProtected = PROTECTED.some(p => path === p || path.startsWith(p + `/`));

  if (isProtected && !hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.searchParams.set(`next`, path);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [`/((?!_next|favicon.ico|assets|api/.*).*)`]
};
