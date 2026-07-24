import { NextRequest, NextResponse } from "next/server";
import scalekit from "@/lib/scalekit";

export async function GET(req : NextRequest) {
    const  url = new URL(req.url);
    const code = url.searchParams.get('code');
    if(!code){
        return NextResponse.json({error: "Authorization code not found"}, {status: 400});
    }
    // Handle the authorization code here
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login/callback`;

    try{
        const session =  scalekit.authenticateWithCode(code , redirectUri);
        

        console.log("Printing from callbackroute Redirect URI:", redirectUri);
        //console.log("Session: ", await session);
        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
        response.cookies.set('access_token',(await session).accessToken, {httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: '/' , secure: true});
        return response;

    }catch(err){
        console.error("Error during authentication: ", err);
        const response = NextResponse.json({error: "Authentication failed"}, {status: 500});
        return response;
    }
}