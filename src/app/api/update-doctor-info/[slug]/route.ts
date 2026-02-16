import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import Doctor from "@/database/doctor.model";
import { revalidateTag } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }, // 1. Define params as a Promise
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 2. Await the params to get the slug (Fixes the crash)
    const { slug } = await params;

    const updateData = await req.json();

    // 3. Data cleaning
    const cleanUpdateData = Object.entries(updateData).reduce(
      (acc: any, [key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    // 4. Update with the modern 'returnDocument' option
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { slug },
      { $set: cleanUpdateData },
      {
        returnDocument: "after", // Fixes the Mongoose warning
        runValidators: true,
      },
    );

    if (!updatedDoctor) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 },
      );
    }

    // 5. Clear Cache
    revalidateTag("doctors");

    return NextResponse.json(
      {
        message: "Doctor updated successfully",
        doctor: updatedDoctor,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
