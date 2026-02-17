"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { X, Phone, User, Mail, MessageSquare, ChevronDown } from "lucide-react";
import Link from "next/link";

interface Slot {
  time: string;
  isBooked: boolean;
}

interface Availability {
  date: string;
  slots: Slot[];
}

interface BookingSectionProps {
  availability: Availability[];
  slug: string;
  doctorName: string;
}

export default function BookingSection({
  availability,
  slug,
  doctorName,
}: BookingSectionProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [describeProblem, setDescribeProblem] = useState("");

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const selectedDate = availability[selectedDateIdx]?.date;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || !selectedDate) return;

    const appointmentData = {
      patient_name: session?.user?.name,
      email: session?.user?.email,
      phone,
      gender,
      describe_problem: describeProblem,
      doctor_name: doctorName, // Ensure this matches prop name
      doctor_slug: slug,
      appointment_time: {
        date: selectedDate,
        slot: { time: selectedTime },
      },
    };

    try {
      Swal.fire({
        title: "Booking...",
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
      });

      const res = await fetch("/api/submit-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });

      if (!res.ok) throw new Error("Failed");

      Swal.fire({
        icon: "success",
        title: "Booked!",
        text: `Appointment confirmed with ${doctorName}`,
        confirmButtonColor: "#2563eb",
      });

      router.refresh();
      setOpenModal(false);
      resetForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }
  };

  const resetForm = () => {
    setPhone("");
    setGender("");
    setDescribeProblem("");
    setSelectedTime(null);
  };

  return (
    <>
      {/* BOOKING SECTION */}
      <div className="rounded-2xl p-8 border border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-sm mt-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Booking slots</h2>

        {/* Date Selection */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {availability.map((item, index) => {
            const dateObj = new Date(item.date);
            const dayName = days[dateObj.getDay()];
            const dayNum = dateObj.getDate();
            const isActive = selectedDateIdx === index;

            return (
              <button
                key={index}
                onClick={() => {
                  setSelectedDateIdx(index);
                  setSelectedTime(null);
                }}
                className={`shrink-0 w-16 h-24 rounded-full flex flex-col items-center justify-center transition-all border ${
                  isActive
                    ? "bg-primary border-primary text-white shadow-lg shadow-blue-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-primary"
                }`}
              >
                <span className="text-xs font-bold mb-1">{dayName}</span>
                <span className="text-lg font-bold">{dayNum}</span>
              </button>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-3">
          {availability[selectedDateIdx]?.slots.map((slot, index) => {
            const isSelected = selectedTime === slot.time;

            return (
              <button
                key={index}
                disabled={slot.isBooked}
                onClick={() => setSelectedTime(slot.time)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  slot.isBooked
                    ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                    : isSelected
                      ? "bg-primary border-primary text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                }`}
              >
                {slot.time}
              </button>
            );
          })}
        </div>

        {selectedTime &&
          (session ? (
            // User is logged in → show "Book Appointment" button
            <button
              onClick={() => setOpenModal(true)}
              className="mt-8 w-full md:w-auto px-10 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-all shadow-lg shadow-blue-100"
            >
              Book Appointment for {selectedTime}
            </button>
          ) : (
            // User is not logged in → show "Sign In" button
            <Link href={"/sign-in"}>
              <button className="mt-8 w-full md:w-auto px-10 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-all cursor-pointer shadow-lg shadow-blue-100">
                Sign in to Book
              </button>
            </Link>
          ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setOpenModal(false)}
          />

          {/* Modal Card */}
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300 z-10">
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Confirm Appointment
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Please review and complete your details.
                </p>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
              {/* User Identity Card (Replaces disabled inputs) */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {session?.user?.name || "Guest User"}
                  </p>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{session?.user?.email}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-200/50 px-2 py-1 rounded-md">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Gender Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wide">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-800 appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wide">
                  Reason for Visit
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <textarea
                    required
                    placeholder="Tell us a bit about your symptoms or concerns..."
                    value={describeProblem}
                    onChange={(e) => setDescribeProblem(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex-1 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="flex-[1.5] py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98] transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
