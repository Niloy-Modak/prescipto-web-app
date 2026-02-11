import { Text } from "@/database/test.model";
import connectDB from "@/lib/mongodb";

import { NextResponse } from "next/server";



// Create text
export async function POST(req: Request) {
  try {
    await connectDB();
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const text = await Text.create({ message });

    return NextResponse.json({ success: true, data: text }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save text" }, { status: 500 });
  }
}

// Get all texts
export async function GET() {
  try {
    await connectDB();
    const texts = await Text.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: texts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch text" }, { status: 500 });
  }
}
