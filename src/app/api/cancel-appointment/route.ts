import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Doctor from "@/database/doctor.model";
import Appointment from "@/database/appointment.model";
import { revalidateTag } from "next/cache";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { appointmentId } = await req.json();

    // 1. Find the appointment
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 },
      );
    }

    if (appointment.status === "cancelled") {
      return NextResponse.json(
        { message: "Appointment already cancelled" },
        { status: 400 },
      );
    }

    const { doctor_slug, appointment_time } = appointment;
    const { date, slot } = appointment_time;

    // 2. Update Doctor's availability (Make slot available again)
    const doctor = await Doctor.findOne({ slug: doctor_slug });

    if (doctor) {
      const dateBlock = doctor.availability.find((d: any) => d.date === date);
      if (dateBlock) {
        const slotBlock = dateBlock.slots.find(
          (s: any) => s.time === slot.time,
        );
        if (slotBlock) {
          slotBlock.isBooked = false; // Make it available
          await doctor.save();
        }
      }
    }

    // 3. Update Appointment Status (Soft delete)
    appointment.status = "cancelled";
    // If you specifically want the isBooked inside the appointment record to be false:
    appointment.appointment_time.slot.isBooked = false;

    await appointment.save();

    // 4. Refresh Cache
    revalidateTag("doctors");
    revalidateTag("appointments");

    return NextResponse.json(
      {
        message: "Appointment cancelled and slot reopened",
        appointment,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("CANCELLATION ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
