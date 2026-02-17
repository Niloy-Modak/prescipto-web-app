import mongoose, { Schema, Document, Model } from "mongoose";

/* -------------------------------------------------
   Sub Types (TypeScript)
-------------------------------------------------- */

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
  date: string; // YYYY-MM-DD
  slots: IAvailabilitySlot[];
}

interface IClinic {
  name: string;
  address: string;
}

/* -------------------------------------------------
   Main Doctor Interface
-------------------------------------------------- */

export interface IDoctor extends Document {
  name: string;
  slug: string;
  title: string;
  yearsOfExperience: number;
  bio: string;
  doctorImage: string;
  specializations: string[];
  clinic: IClinic;
  education: IEducation[];
  awards?: string[];
  workExperience: IWorkExperience[];
  availability: IAvailability[];
  fee: number;
  activeStatus: boolean;
}

/* -------------------------------------------------
   Sub Schemas
-------------------------------------------------- */

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true, trim: true },
    institute: { type: String, required: true, trim: true },
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
  { _id: false },
);

const WorkExperienceSchema = new Schema<IWorkExperience>(
  {
    position: { type: String, required: true, trim: true },
    workPlace: { type: String, required: true, trim: true },
    startYear: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
    endYear: {
      type: Number,
      default: null,
    },
  },
  { _id: false },
);

const AvailabilitySlotSchema = new Schema<IAvailabilitySlot>(
  {
    time: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
  },
  { _id: false },
);

const AvailabilitySchema = new Schema<IAvailability>(
  {
    date: { type: String, required: true },
    slots: { type: [AvailabilitySlotSchema], default: [] },
  },
  { _id: false },
);

const ClinicSchema = new Schema<IClinic>(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { _id: false },
);

/* -------------------------------------------------
   Doctor Schema
-------------------------------------------------- */

const DoctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
      max: 70,
    },

    bio: {
      type: String,
      required: true,
      trim: true,
    },

    doctorImage: {
      type: String,
      required: true,
    },

    specializations: {
      type: [String],
      required: true,
      index: true,
    },

    clinic: {
      type: ClinicSchema,
      required: true,
    },

    education: {
      type: [EducationSchema],
      default: [],
      required: true,
    },

    awards: {
      type: [String],
      default: [],
    },

    workExperience: {
      type: [WorkExperienceSchema],
      default: [],
      required: true,
    },

    availability: {
      type: [AvailabilitySchema],
      default: [],
      required: true,
    },

    fee: {
      type: Number,
      required: true,
      min: 0,
    },

    activeStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

/* -------------------------------------------------
   Model Export (Next.js Safe)
-------------------------------------------------- */

const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
