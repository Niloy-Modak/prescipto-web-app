import mongoose from "mongoose";
import * as dotenv from "dotenv";
// import Doctor from "@/doctor.model";
import { doctors } from "@/lib/textConstants";
import Doctor from "@/database/doctor.model";


// Load environment variables
dotenv.config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI

async function seedAndVerify() {
  try {
    console.log("--- Starting Database Verification ---");

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    // 1. Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB.");

    // 2. Clear existing Doctors
    await Doctor.deleteMany({});
    console.log("🧹 Cleared existing doctor records.");

    // 3. Insert the 10 Doctors
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`🚀 Successfully seeded ${createdDoctors.length} doctors.`);

    // 4. Verification: Use a slug that definitely exists in your textConstants
    const testSlug = doctors[0].slug;
    const foundDoctor = await Doctor.findOne({ slug: testSlug });

    if (foundDoctor) {
      console.log("\n--- Data Integrity Check ---");
      console.log(`Name: ${foundDoctor.name}`);
      console.log(`Specializations: ${foundDoctor.specializations.join(", ")}`);

      // FIXED: Using 'startYear' and 'endYear' to match your Schema
      if (foundDoctor.education && foundDoctor.education.length > 0) {
        console.log(
          `Education: ${foundDoctor.education[0].degree} from ${foundDoctor.education[0].startYear}`,
        );
      }

      console.log(
        `Work Experience Count: ${foundDoctor.workExperience.length}`,
      );

      if (
        foundDoctor.availability.length > 0 &&
        foundDoctor.availability[0].slots.length > 0
      ) {
        console.log(
          `First Slot Booked Status: ${foundDoctor.availability[0].slots[0].isBooked}`,
        );
      }

      console.log(
        "\n✅ Everything is working fine! The Schema matches your Data.",
      );
    } else {
      console.log("❌ Error: Could not find the seeded doctor.");
    }
  } catch (error) {
    console.error("❌ Database operation failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed.");
  }
}

seedAndVerify();
