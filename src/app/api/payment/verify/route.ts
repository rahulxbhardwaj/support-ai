import { NextRequest, NextResponse } from "next/server";
import connectToDb from "../../../../lib/db";
import Settings from "@/model/settings.model";
export async function POST(req: NextRequest) {

    const { ownerId, credits } = await req.json();

    await connectToDb();

    const result = await Settings.updateOne(
        { ownerId },
        {
            $inc: {
                creditsRemaining: credits
            }
        }
    );
    console.log(result);
    return NextResponse.json({
        success: true
    });
}