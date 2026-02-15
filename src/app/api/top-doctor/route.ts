// src/app/api/top-doctor/route.ts
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";

export async function GET() {
  try {
    await connectDB();

    // 🔹 Fetch top 4 doctors by yearsOfExperience
    const topDoctors = await Doctor.find({ activeStatus: true })
      .sort({ yearsOfExperience: -1 })
      .limit(4)
      .lean();

    // 🔹 Revalidate cache tag for top doctors
    revalidateTag("top-doctors");

    return NextResponse.json(
      {
        message: "Top doctors fetched successfully",
        doctors: topDoctors,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching top doctors:", error);
    return NextResponse.json(
      { message: "Failed to fetch top doctors" },
      { status: 500 },
    );
  }
}
