import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const specialization = searchParams.get("specialization");
    const sort = searchParams.get("sort");

    const filter: Record<string, unknown> = {
      activeStatus: true,
    };

    if (specialization) {
      filter.specializations = { $in: [specialization] };
    }

    let doctorsQuery = Doctor.find(filter);

    if (sort === "experience") {
      doctorsQuery = doctorsQuery.sort({ yearsOfExperience: -1 });
    }

    if (sort === "fee-low") {
      doctorsQuery = doctorsQuery.sort({ fee: 1 });
    }

    if (sort === "fee-high") {
      doctorsQuery = doctorsQuery.sort({ fee: -1 });
    }

    const doctors = await doctorsQuery.lean();

    return NextResponse.json(
      { message: "Doctors fetched successfully", doctors },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch doctors" },
      { status: 500 },
    );
  }
}
