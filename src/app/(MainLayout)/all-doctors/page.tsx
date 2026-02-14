import DoctorCard from "@/components/shared/cards/DoctorCard";
import { doctors } from "@/lib/textConstants";
import React from "react";

const AllDoctorPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl text-center text-primary font-semibold">
        All Doctors to Book
      </h1>

      <div className="flex flex-col items-center justify-center">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 ">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.slug}
              name={doctor.name}
              title={doctor.title}
              slug={doctor.slug}
              doctorImage={doctor.doctorImage}
              specializations={doctor.specializations}
              activeStatus={doctor.activeStatus}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllDoctorPage;
