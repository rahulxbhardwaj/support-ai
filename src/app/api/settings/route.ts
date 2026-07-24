import { NextRequest, NextResponse } from "next/server";
import connectToDb from "../../../lib/db";
import Settings from "@/model/settings.model";

export async function POST(req : NextRequest) {
    try{
        const { ownerId, businessName, supportEmail, knowledge } = await req.json();
        if(!ownerId || !businessName || !supportEmail || !knowledge) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }
        await connectToDb();
        const settings = await Settings.findOneAndUpdate({ownerId}, { businessName, supportEmail, knowledge }, { new: true, upsert: true });
        return NextResponse.json({ message: "Settings saved successfully", settings }, { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ message: "Error saving settings" }, { status: 500 });
    }
}

