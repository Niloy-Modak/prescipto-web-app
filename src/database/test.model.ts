import mongoose, { Schema, models } from "mongoose";

const textSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

export const Text = models.Text || mongoose.model("Text", textSchema);
