import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patient_name: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  describe_problem: string;

  doctor_slug: string;
  doctor_name: string;
  appointment_time: {
    date: string;
    slot: {
      time: string;
      isBooked: boolean;
    };
  };

  status: "pending" | "confirmed" | "cancelled";
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    patient_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    describe_problem: { type: String, required: true },
    doctor_slug: { type: String, required: true, index: true },
    doctor_name: { type: String, required: true }, 
    appointment_time: {
      date: { type: String, required: true },
      slot: {
        time: { type: String, required: true },
        isBooked: { type: Boolean, default: true },
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);
