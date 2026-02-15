import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";
import { revalidateTag } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();
    const { slug } = await params;

    const doctor = await Doctor.findOne({ slug, activeStatus: true }).lean();

    if (!doctor) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 },
      );
    }

    // Revalidate cache for all pages/components that use "doctors" tag
    revalidateTag("doctors", "default");

    return NextResponse.json({ doctor }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch doctor" },
      { status: 500 },
    );
  }
}
