import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Appointment from "@/database/appointment.model";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const appointments = await Appointment.find({
      email: session.user.email,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("MY APPOINTMENTS ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
