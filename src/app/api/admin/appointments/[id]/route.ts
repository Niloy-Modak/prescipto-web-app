import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Appointment from "@/database/appointment.model";

const ALLOWED_STATUS = ["pending", "confirmed", "cancelled"];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // 1️ Unwrap params (Next.js 14)
    const { id } = await params;

    // 2️ Check admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized. Admin only." },
        { status: 403 },
      );
    }

    // 3️ Parse body
    const { status } = await req.json();

    if (!ALLOWED_STATUS.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 },
      );
    }

    // 4️ Connect DB
    await connectDB();

    // 5️ Update appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedAppointment) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Status updated successfully",
        appointment: updatedAppointment,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
