"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Edit, Trash2, User, Activity, DollarSign, X } from "lucide-react";
import UpdateDoctorForm from "../updateDoctor/UpdateDoctorForm";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Doctor {
  slug: string;
  name: string;
  title: string;
  doctorImage: string;
  specializations: string[];
  activeStatus: boolean;
  fee: number;
}

const DoctorTable = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Function to fetch data (wrapped in useCallback to avoid re-renders)
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/doctors");
      const data = await response.json();
      setDoctors(data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleEditClick = (slug: string) => {
    setSelectedSlug(slug);
    setIsModalOpen(true);
  };
  const router = useRouter();
  const handleDelete = async (slug: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This doctor will be permanently removed from the directory.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await fetch(`/api/delete-doctor/${slug}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Delete failed");
          }
          return response.json();
        } catch (error: any) {
          Swal.showValidationMessage(`Error: ${error.message}`);
        }
      },
    });

    if (result.isConfirmed) {
      // 1. Optimistic UI Update: Remove from local state immediately
      setDoctors((prev) => prev.filter((doc) => doc.slug !== slug));

      // 2. Show Success
      Swal.fire({
        title: "Deleted!",
        text: "The doctor profile has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // 3. Trigger Next.js Server Revalidation
      router.refresh();
    }
  };

  if (loading && doctors.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className=" md:p-1 lg:p-8  min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-center font-medium tracking-tight">
              Medical Directory
            </h1>
            <p className="text-slate-500 mt-1 text-xs md:text-2xs text-center">
              Manage {doctors.length} professional medical profiles
            </p>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Doctor
                  </th>
                  <th className="px-8 py-5 text-xs font-black hidden lg:table-cell text-slate-400 uppercase tracking-widest">
                    Specialization
                  </th>
                  <th className="px-8 py-5 text-xs font-black hidden lg:table-cell text-slate-400 uppercase tracking-widest text-center">
                    Fee
                  </th>
                  <th className="px-8 py-5 text-xs font-black text-slate-400 hidden md:table-cell uppercase tracking-widest text-center">
                    Status
                  </th>
                  <th className="px-8 text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.map((doctor) => (
                  <tr
                    key={doctor.slug}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    {/* INFO COLUMN */}
                    <td className="px-2 md:px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                          <Link href={`/doctor/${doctor.slug}`}>
                            {doctor.doctorImage ? (
                              <Image
                                src={doctor.doctorImage}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <User className="w-full h-full p-2 text-slate-300" />
                            )}
                          </Link>
                        </div>
                        <div>
                          <Link href={`/doctor/${doctor.slug}`}>
                          <p className="font-bold text-slate-800 text-base">
                            {doctor.name}
                          </p>
                          </Link>
        
                          <p className="text-xs font-medium text-slate-400">
                            {doctor.title}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SPECIALIZATION COLUMN */}
                    <td className="px-8 py-5 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1.5">
                        {doctor.specializations?.slice(0, 2).map((spec, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg"
                          >
                            {spec}
                          </span>
                        ))}
                        {doctor.specializations?.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-bold ml-1">
                            +{doctor.specializations.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* FEE COLUMN */}
                    <td className="px-8 py-5 text-center hidden lg:table-cell">
                      <span className="text-sm font-bold text-slate-700">
                        ${doctor.fee}
                      </span>
                    </td>

                    {/* STATUS COLUMN */}
                    <td className="px-8 py-5 text-center hidden md:table-cell">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                          doctor.activeStatus
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${doctor.activeStatus ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
                        />
                        <span className="text-[10px] font-black uppercase tracking-tighter">
                          {doctor.activeStatus ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    {/* ACTIONS COLUMN */}
                    <td className="px-2 md:px-8 text-right">
                      <div className="flex justify-end gap-2  transition-opacity">
                        <button
                          onClick={() => handleEditClick(doctor.slug)}
                          className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit Profile"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(doctor.slug)}
                          className="p-2.5 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete Profile"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      {isModalOpen && selectedSlug && (
        // Backdrop
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)} // click outside closes modal
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-[2.5rem] w-full max-w-3xl md:max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden ring-1 ring-black/5"
            onClick={(e) => e.stopPropagation()} // stop clicks inside modal
          >
            {/* Modal Header */}
            <div className="border-b border-slate-100 flex justify-between items-center p-6 sticky top-0 bg-white z-10">
              <div className="text-center flex-1">
                <h2 className="text-xl md:text-2xl font-black text-primary tracking-tight">
                  Edit Professional Profile
                </h2>
                <p className="text-sm text-slate-400 font-medium mt-1">
                  Updating data for slug:{" "}
                  <span className="text-primary">{selectedSlug}</span>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto  flex-1 ">
              <UpdateDoctorForm
                slug={selectedSlug}
                onUpdateSuccess={() => {
                  setIsModalOpen(false);
                  fetchDoctors(); // Refresh table data
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorTable;
