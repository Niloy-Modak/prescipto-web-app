import DoctorCard from "@/components/shared/cards/DoctorCard";
import { DoctorType } from "@/lib/doctorType";

const TopDoctors = async () => {
  let doctors: DoctorType[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/top-doctor`,
      {
        next: { tags: ["top-doctors"] },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch top doctors");

    const data = await res.json();
    doctors = data.doctors || [];
  } catch (error) {
    console.error("TopDoctors fetch error:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl text-center text-primary font-semibold">
        Top Doctors to Book
      </h1>
      <p className="text-center text-gray-600 pt-4">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {doctors.length === 0 ? (
        <div className="text-gray-500 text-center mt-10">
          No top doctors found.
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.slug}
              name={doctor.name}
              title={doctor.title || "Unknown"}
              slug={doctor.slug}
              doctorImage={doctor.doctorImage}
              specializations={doctor.specializations}
              activeStatus={doctor.activeStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TopDoctors;
