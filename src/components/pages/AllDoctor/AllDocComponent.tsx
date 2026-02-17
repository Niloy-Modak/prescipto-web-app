// src/app/doctors/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import DoctorCard from "@/components/shared/cards/DoctorCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { DoctorType } from "@/lib/doctorType";

// --- Debounce hook for search input ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const AllDocPage = () => {
  const [doctors, setDoctors] = useState<DoctorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sort, setSort] = useState<string>("name");
  const [specialization, setSpecialization] = useState<string>("");
  const debouncedSpecialization = useDebounce(specialization, 500);

  // --- Fetch doctors from server with caching + revalidation ---
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (sort) params.append("sort", sort);
      if (debouncedSpecialization)
        params.append("specialization", debouncedSpecialization);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors?${params.toString()}`,
        {
          next: { tags: ["doctors"] },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch doctors");

      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [sort, debouncedSpecialization]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <section className="">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-semibold text-primary tracking-tight">
          Find a Specialist
        </h1>
        <p className="mt-2 text-gray-600">
          Book appointments with top-rated doctors
        </p>
      </header>

      {/* --- Filter + Sorting --- */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-porcelain/40 backdrop-blur-md border border-porcelain/20 rounded-xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        {/* Search by Specialization */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search specialization (e.g., Cardiology)"
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <SlidersHorizontal className="text-gray-500 h-5 w-5" />
          <select
            className="flex-1 md:w-48 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="experience">Experience: High to Low</option>
            <option value="fee-low">Fee: Low to High</option>
            <option value="fee-high">Fee: High to Low</option>
          </select>
        </div>
      </div>

      {/* --- Results --- */}
      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center">
          <p className="font-medium">{error}</p>
          <button onClick={fetchDoctors} className="mt-4 text-sm underline">
            Try Again
          </button>
        </div>
      ) : (
        <div
          className="
                      grid grid-cols-1
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      gap-8
                      auto-rows-fr"
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.slug}
                slug={doctor.slug}
                name={doctor.name}
                title={doctor.title}
                doctorImage={doctor.doctorImage}
                activeStatus={doctor.activeStatus}
                specializations={doctor.specializations}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400 text-lg">
                No doctors match your criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// --- Skeleton Loader ---
const SkeletonCard = () => (
  <div className="bg-gray-100 animate-pulse rounded-2xl h-[380px] w-full">
    <div className="bg-gray-200 h-2/3 rounded-t-2xl" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default AllDocPage;
