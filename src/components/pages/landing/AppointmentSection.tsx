import React from "react";
import Image from "next/image";
import Link from "next/link";

const AppointmentSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:px-20 py-10 md:relative">
      {/* Container with relative positioning to allow image to pop out */}
      <div className="relative bg-primary rounded-lg px-8 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between lg:min-h-113.75">
        {/* Left Content */}
        <div className="py-10 md:py-16 text-white z-10">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Book Appointment
          </h1>

          <p className="mt-3 text-2xl md:text-3xl font-semibold">
            With 100+ Trusted Doctors
          </p>

          <Link
            href="/register"
            className="
              inline-block mt-6
              bg-white text-primary
              px-6 py-3
              rounded-full
              font-medium
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            Create account
          </Link>
        </div>

        {/* Right Image - Positioned to overflow the container */}
        <div className="hidden md:block lg:w-xl  md:absolute bottom-0 right-0">
          <Image
            src="/appointment-doc-img.png"
            alt="Doctor"
            width={350}
            height={400}
            className="lg:w-full"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
