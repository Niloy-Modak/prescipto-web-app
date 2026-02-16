import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";

// Cloudinary config
cloudinary.config({
  secure: true,
  url: process.env.CLOUDINARY_URL,
});

export async function POST(req: NextRequest) {
  try {
    // ===========================
    // AUTHORIZATION (ADMIN ONLY)
    // ===========================
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized - Admin access only" },
        { status: 403 },
      );
    }

    // ===========================
    // 1️ Connect DB
    // ===========================
    await connectDB();
    const body = await req.json();

    const {
      name,
      title,
      specializations,
      doctorImage,
      clinic = {},
      ...rest
    } = body;

    // ===========================
    // 2️ Validate required fields
    // ===========================
    const missingFields: string[] = [];
    if (!name?.trim()) missingFields.push("Doctor name");
    if (!Array.isArray(specializations) || specializations.length === 0)
      missingFields.push("Specializations");
    if (!doctorImage?.trim()) missingFields.push("Doctor image");
    if (!clinic.name?.trim()) missingFields.push("Clinic name");
    if (!clinic.address?.trim()) missingFields.push("Clinic address");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Please fill up the form - Missing: ${missingFields.join(", ")}`,
          missingFields,
        },
        { status: 400 },
      );
    }

    // ===========================
    // 3️ Upload image to Cloudinary
    // ===========================
    const uploadRes = await cloudinary.uploader.upload(doctorImage, {
      folder: "doctors_list",
    });

    // ===========================
    // 4️ Generate slug & save doctor
    // ===========================
    const slug = `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

    const newDoctor = await Doctor.create({
      ...rest,
      name,
      title,
      specializations,
      doctorImage: uploadRes.secure_url,
      slug,
      clinic,
      activeStatus: true,
      createdBy: session.user.email, // 🔥 audit trail (optional)
    });

    // ===========================
    // 5️ Revalidate cache
    // ===========================
    revalidateTag("doctors");
    revalidateTag("top-doctors");
    specializations.forEach((spec: string) =>
      revalidateTag(`specialization-${spec.toLowerCase()}`),
    );

    return NextResponse.json(
      {
        message: "Doctor created successfully",
        doctor: newDoctor,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("POST /api/add-doctor Error:", error);

    return NextResponse.json(
      { message: "Server error - Please try again later" },
      { status: 500 },
    );
  }
}
