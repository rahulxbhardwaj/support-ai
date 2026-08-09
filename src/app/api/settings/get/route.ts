import { NextRequest, NextResponse } from "next/server";
import connectToDb from "../../../../lib/db";
import Settings from "@/model/settings.model";
export async function POST(req: NextRequest) {
  try {
    await connectToDb();

    const { ownerId } = await req.json();

    if (!ownerId) {
      return NextResponse.json(
        { message: "Missing ownerId" },
        { status: 400 }
      );
    }

    const settings = await Settings.findOne({ ownerId });
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error fetching settings" },
      { status: 500 }
    );
  }
}