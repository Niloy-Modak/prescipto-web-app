import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Appointment from "@/database/appointment.model";

export async function GET() {
  try {
    // 1️ Check admin session
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized. Admin only." },
        { status: 403 },
      );
    }

    // 2️ Connect DB
    await connectDB();

    // 3️ Fetch appointments
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("GET APPOINTMENTS ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
