import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  slug: string;
  title: string;
  yearsOfExperience: number;
  bio: string;
  doctorImage: string;
  specializations: string[];
  clinic: {
    name: string;
    address: string;
  };
  availability: {
    date: string;
    slots: {
      time: string;
      isBooked: boolean;
    }[];
  }[];
  fee: number;
  activeStatus: boolean;
}

const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    yearsOfExperience: Number,
    bio: String,
    doctorImage: String,
    specializations: [{ type: String }],
    clinic: {
      name: String,
      address: String,
    },
    availability: [
      {
        date: String,
        slots: [
          {
            time: String,
            isBooked: Boolean,
          },
        ],
      },
    ],
    fee: Number,
    activeStatus: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
