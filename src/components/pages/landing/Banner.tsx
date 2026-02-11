import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="relative w-full py-16 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl  font-bold text-[#333] leading-tight mb-6">
            Providing Quality <span className="text-primary">Healthcare</span>{" "}
            For A<span className="text-secondary"> Brighter</span> And{" "}
            <span className="text-secondary">Healthy</span> Future
          </h1>

          <p className="text-gray-600 text-xs sm:text-[16px] md:text-lg leading-relaxed mb-8 max-w-xl">
            At Our Hospital, We Are Dedicated To Providing Exceptional Medical
            Care To Our Patients And Their Families. Our Experienced Team Of
            Medical Professionals, Cutting-Edge Technology, And Compassionate
            Approach Make Us A Leader In The Healthcare Industry.
          </p>

          <button className="bg-[#008080] text-white px-8 py-3 rounded-lg text-xl font-medium hover:bg-[#006666] transition-all">
            Appointments
          </button>
        </div>

        {/* Right Content (Image) */}
        <div className="relative flex justify-center items-center">

          {/* Doctor Image */}
          <div className="relative z-10">
            <Image
              src="/banner/banner.png" 
              alt="Doctor"
              width={400}
              height={600}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
