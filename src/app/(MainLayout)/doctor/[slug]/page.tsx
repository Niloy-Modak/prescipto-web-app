import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { doctors } from "@/lib/textConstants"; // Ensure this contains the 10 doctors we seeded
import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import BookingSection from "@/components/pages/doctor/BookingSection";
import { DoctorType } from "@/lib/doctorType";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const DoctorDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/${slug}`,
    { next: { tags: ["doctors"] } },
  );

  // 2. Handle 404 or errors
  if (!response.ok) {
    if (response.status === 404) notFound();
    throw new Error("Failed to fetch doctor data");
  }

  const data: { doctor: DoctorType } = await response.json();
  const doctor = data.doctor;

  
  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-linear-to-b from-slate-100 to-slate-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN - Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl p-8 border border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-lg flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-porcelain/30 relative">
                <Image
                  src={doctor.doctorImage}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex items-center gap-1 mb-1">
              <h1 className="text-xl font-bold text-slate-800">
                {doctor.name}
              </h1>
            </div>
            <p className="text-slate-600 text-sm mb-4 font-medium">
              {doctor.title}
            </p>

            <div className="w-full space-y-3">
              <div className="text-center pt-2">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Consultation Fee
                </p>
                <p className="text-xl font-bold text-slate-800">
                  ${doctor.fee}
                </p>
              </div>
            </div>
          </div>

          {/* Clinic Location Card */}
          <div className="rounded-2xl p-6 border border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <MapPin className="w-5 h-5" />
              <h3 className="font-bold text-slate-800">Clinic Location</h3>
            </div>
            <div className="mb-4">
              <p className="font-bold text-slate-800 text-sm">
                {doctor.clinic?.name}
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                {doctor.clinic?.address}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* About Section */}
          <div className="rounded-2xl p-8 border border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              About {doctor.name}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              {doctor.bio} With {doctor.yearsOfExperience} years of dedicated
              experience, {doctor.name} provides expert care tailored to
              individual patient needs.
            </p>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.specializations.map((spec) => (
                <span
                  key={spec}
                  className="bg-primary/30 backdrop-blur-md text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-porcelain/20"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <BookingSection availability={doctor.availability} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Work Experience */}
            <div className="rounded-2xl p-8 border border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-lg">
              {/* ... same content ... */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-2.75 before:w-0.5 before:bg-primary/30">
                {doctor.workExperience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-porcelain border-4 border-primary z-10"></div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {exp.position}
                    </h4>
                    <p className="text-slate-500 text-xs">{exp.workPlace}</p>
                    <p className="text-slate-400 text-[10px] mt-1 uppercase font-semibold">
                      {exp.startYear} - {exp.endYear ?? "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Awards */}
            <div className="space-y-6">
              {/* Education Card */}
              <div className="rounded-2xl p-8 border border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Education
                  </h2>
                </div>

                <div className="space-y-6">
                  {doctor.education.map((edu, idx) => (
                    <div key={idx} className="flex gap-4">
                      {/* <div className="w-12 h-12 bg-slate-50 rounded flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-100 flex-shrink-0">
                        {edu.institute
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div> */}
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">
                          {edu.degree}
                        </h4>
                        <p className="text-slate-500 text-xs">
                          {edu.institute}
                        </p>
                        <p className="text-slate-400 text-[10px] mt-1 uppercase font-semibold">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards Card */}
              <div className="rounded-2xl p-8 border border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-lg">
                {/* ... same content ... */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">Awards</h2>
                </div>
                <ul className="space-y-3">
                  {doctor.awards.map((award, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <span className="text-slate-400 mt-1.5">•</span>
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
