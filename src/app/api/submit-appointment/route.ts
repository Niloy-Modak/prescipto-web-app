import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";
import Appointment from "@/database/appointment.model";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      doctor_name,
      patient_name,
      email,
      phone,
      gender,
      describe_problem,
      doctor_slug,
      appointment_time,
    } = body;

    const { date, slot } = appointment_time;

    // 1. Find doctor by slug
    const doctor = await Doctor.findOne({ slug: doctor_slug });

    if (!doctor) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 },
      );
    }

    // 2. Find date block
    const dateBlock = doctor.availability.find((d: any) => d.date === date);

    if (!dateBlock) {
      return NextResponse.json(
        { message: "Date not available" },
        { status: 400 },
      );
    }

    // 3. Find slot block
    const slotBlock = dateBlock.slots.find((s: any) => s.time === slot.time);

    if (!slotBlock) {
      return NextResponse.json({ message: "Slot not found" }, { status: 400 });
    }

    // 4. Prevent double booking
    if (slotBlock.isBooked) {
      return NextResponse.json(
        { message: "Slot already booked" },
        { status: 409 },
      );
    }

    // 5. Update main doctor availability
    slotBlock.isBooked = true;
    await doctor.save();

    // 6. Create appointment record
    const appointment = await Appointment.create({
      doctor_name,
      patient_name,
      email,
      phone,
      gender,
      describe_problem,
      doctor_slug,
      appointment_time: {
        date,
        slot: {
          time: slot.time,
          isBooked: true,
        },
      },
    });

    revalidateTag("doctors");
    revalidateTag("appointments");

    return NextResponse.json(
      { message: "Appointment booked successfully", appointment },
      { status: 201 },
    );
  } catch (error) {
    console.error("BOOKING ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
