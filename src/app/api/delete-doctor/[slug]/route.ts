import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // 1️ Unwrap params (IMPORTANT)
    const { slug } = await params;

    // 2️ Check session
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized. Admin only." },
        { status: 403 },
      );
    }

    // 3️ Connect DB
    await connectDB();

    // 4️ Delete doctor
    const deletedDoctor = await Doctor.findOneAndDelete({ slug });

    if (!deletedDoctor) {
      return NextResponse.json(
        { message: "Doctor not found." },
        { status: 404 },
      );
    }

    // 5️ Success
    return NextResponse.json(
      {
        message: "Doctor deleted successfully",
        slug,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE DOCTOR ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
