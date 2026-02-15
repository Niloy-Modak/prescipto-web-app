import mongoose, { Schema, Document, Model } from "mongoose";

/* ---------- Sub Types ---------- */

interface IEducation {
  degree: string;
  institute: string;
  startYear: number;
  endYear: number;
}

interface IWorkExperience {
  position: string;
  workPlace: string;
  startYear: number;
  endYear: number | null; // null = Present
}

interface IAvailabilitySlot {
  time: string;
  isBooked: boolean;
}

interface IAvailability {
  date: string;
  slots: IAvailabilitySlot[];
}

interface IClinic {
  name: string;
  address: string;
}

/* ---------- Main Doctor Interface ---------- */

export interface IDoctor extends Document {
  name: string;
  slug: string;
  title?: string;
  yearsOfExperience?: number;
  bio?: string;
  doctorImage: string;
  specializations: string[];
  clinic: IClinic;
  education: IEducation[];
  awards: string[];
  workExperience: IWorkExperience[];
  availability: IAvailability[];
  fee?: number;
  activeStatus: boolean;
}

/* ---------- Schema ---------- */

const DoctorSchema: Schema<IDoctor> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: String,
    yearsOfExperience: Number,
    bio: String,
    doctorImage: { type: String, required: true },

    specializations: [{ type: String,  required: true  }],

    clinic: {
      name: String,
      address: String,
    },

    education: [
      {
        degree: { type: String, required: true },
        institute: { type: String, required: true },
        startYear: {
          type: Number,
          required: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
        endYear: {
          type: Number,
          required: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
    ],

    awards: [{ type: String }],

    workExperience: [
      {
        position: { type: String, required: true },
        workPlace: { type: String, required: true },
        startYear: {
          type: Number,
          required: true,
          min: 1900,
          max: new Date().getFullYear(),
        },
        endYear: {
          type: Number,
          default: null, // null = Present
        },
      },
    ],

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

/* ---------- Model ---------- */

const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
