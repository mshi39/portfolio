import { NextResponse, type NextRequest } from "next/server";
import { passwordGate } from "./password-gate";

export async function proxy(request: NextRequest) {
  return await passwordGate(request) ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/work/sales-assessment-platform-ai-integration",
    "/work/ai-powered-feedback-intelligence-platform",
    "/work/enterprise-search-generative-ai",
    "/work/voice-of-the-customer-admin-portal-revamp",
  ],
};
