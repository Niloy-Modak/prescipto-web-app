import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const specialization = searchParams.get("specialization");
    const sort = searchParams.get("sort");

    const filter: Record<string, unknown> = { activeStatus: true };
    if (specialization) filter.specializations = { $in: [specialization] };

    let doctorsQuery = Doctor.find(filter, {
      _id: 0,
      slug: 1,
      name: 1,
      title: 1,
      doctorImage: 1,
      specializations: 1,
      fee: 1,
      activeStatus: 1,
      yearsOfExperience: 1,
    });

    switch (sort) {
      case "experience":
        doctorsQuery = doctorsQuery.sort({ yearsOfExperience: -1 });
        break;
      case "fee-low":
        doctorsQuery = doctorsQuery.sort({ fee: 1 });
        break;
      case "fee-high":
        doctorsQuery = doctorsQuery.sort({ fee: -1 });
        break;
      default:
        doctorsQuery = doctorsQuery.sort({ name: 1 });
    }

    const doctors = await doctorsQuery.lean();

    return NextResponse.json(
      { message: "Doctors fetched successfully", doctors },
      {
        status: 200,
        headers: {
          // Important: Attach the tag for automatic revalidation
          "x-nextjs-revalidate-tag": "doctors",
        },
      },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch doctors" },
      { status: 500 },
    );
  }
}
