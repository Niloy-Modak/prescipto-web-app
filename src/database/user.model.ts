import mongoose, { Schema, model, models } from "mongoose";

export type UserRole = "user" | "admin";
export type Gender = "male" | "female" | "other";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profileImage?: string | null;
  phone?: string | null;
  gender?: Gender | null;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profileImage: { type: String, default: null },
    phone: { type: String, default: null },
    gender: { type: String, enum: ["male", "female", "other"], default: null },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", UserSchema);
export default User;
