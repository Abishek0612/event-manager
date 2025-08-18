import { internationalizationMiddleware } from "@repo/internationalization/middleware";
import { type NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|ingest|favicon.ico).*)"],
};

export default function middleware(request: NextRequest) {
  return internationalizationMiddleware(request);
}
