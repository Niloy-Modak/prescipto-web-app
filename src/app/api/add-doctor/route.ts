// src/app/api/add-doctor/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

// Cloudinary config
cloudinary.config({
  secure: true,
  url: process.env.CLOUDINARY_URL,
});

export async function POST(req: NextRequest) {
  try {
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
    // 1️⃣ Validate required fields
    // ===========================
    const missingFields: string[] = [];
    if (!name || name.trim() === "") missingFields.push("Doctor name");
    if (
      !specializations ||
      !Array.isArray(specializations) ||
      specializations.length === 0
    )
      missingFields.push("Specializations");
    if (!doctorImage || doctorImage.trim() === "")
      missingFields.push("Doctor image");
    if (!clinic.name || clinic.name.trim() === "")
      missingFields.push("Clinic name");
    if (!clinic.address || clinic.address.trim() === "")
      missingFields.push("Clinic address");

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
    // 2️⃣ Upload image to Cloudinary
    // ===========================
    let imageUrl = "";
    try {
      const uploadRes = await cloudinary.uploader.upload(doctorImage, {
        folder: "doctors_list",
      });
      imageUrl = uploadRes.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return NextResponse.json(
        { message: "Image upload failed - Please try again" },
        { status: 500 },
      );
    }

    // ===========================
    // 3️⃣ Generate slug & save doctor
    // ===========================
    const slugBase = name.toLowerCase().trim().replace(/\s+/g, "-");
    let slug = `${slugBase}-${Date.now()}`;

    const newDoctor = await Doctor.create({
      ...rest,
      name,
      title,
      specializations,
      doctorImage: imageUrl,
      slug,
      clinic,
      activeStatus: true,
    });

    // ===========================
    // 4️⃣ Revalidate tags (Next.js 16)
    // ===========================
    revalidateTag("doctors"); // main doctors list
    revalidateTag("featured-doctors"); // homepage sections
    specializations.forEach((spec: string) =>
      revalidateTag(`specialization-${spec.toLowerCase()}`),
    );

    // ===========================
    // 5️⃣ Return success with header
    // ===========================
    return NextResponse.json(
      {
        message: "Doctor created successfully",
        doctor: newDoctor,
        revalidated: true,
      },
      {
        status: 201,
        headers: { "x-nextjs-revalidate-tag": "doctors" }, // triggers cache refresh
      },
    );
  } catch (error: any) {
    console.error("POST /api/add-doctor Error:", error);

    if (error.name === "ValidationError") {
      const missingFields = Object.keys(error.errors);
      return NextResponse.json(
        { message: `Validation failed - Missing: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Server error - Please try again later" },
      { status: 500 },
    );
  }
}
