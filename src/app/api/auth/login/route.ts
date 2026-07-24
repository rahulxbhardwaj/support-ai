import { NextRequest, NextResponse } from "next/server";
import scalekit from "@/lib/scalekit";

export async function GET(req : NextRequest) {
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login/callback`;
    console.log("Printing from login route Redirect URI:", redirectUri);
    const url = scalekit.getAuthorizationUrl(redirectUri);
    return NextResponse.redirect(url);

}