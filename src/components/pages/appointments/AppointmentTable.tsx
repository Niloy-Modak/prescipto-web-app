"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Calendar,
  Clock,
  Trash2,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface Appointment {
  _id: string;
  doctor_slug: string;
  doctor_name: string; // Added this
  appointment_time: {
    date: string;
    slot: {
      time: string;
    };
  };
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

const AppointmentTable = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/my-appointments");
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id: string) => {
    const result = await Swal.fire({
      title: "Cancel Appointment?",
      text: "This slot will be reopened for other patients.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, cancel it!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Processing...",
        didOpen: () => Swal.showLoading(),
      });

      try {
        const res = await fetch(`/api/cancel-appointment`, {
          method: "PATCH", // Using PATCH for status updates
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ appointmentId: id }),
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Cancelled",
            text: "The slot is now available again.",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchAppointments(); // Refresh list
          router.refresh(); // Refresh server state
        } else {
          throw new Error();
        }
      } catch (error) {
        Swal.fire("Error", "Could not process cancellation.", "error");
      }
    }
  };

  const formatLocalTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-medium text-primary">
            My Appointments
          </h2>
          <p className="text-slate-500 text-2xs mt-1">
            Manage your upcoming and past visits
          </p>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-full text-primary font-bold text-sm">
          {appointments.length} Total
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No appointments found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className={`group relative bg-white  backdrop-blur-md
        border border-primary/20 rounded-2xl p-5 transition-all hover:shadow-md ${
                appt.status === "cancelled"
                  ? "opacity-75 grayscale-[0.5]"
                  : "hover:border-primary/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Doctor & Status */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      appt.status === "cancelled"
                        ? "bg-slate-100 text-slate-400"
                        : "bg-blue-50 text-primary"
                    }`}
                  >
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <Link href={`doctor/${appt.doctor_slug}`}>
                      <h3 className="font-bold text-slate-800 text-lg">
                        {appt.doctor_name || "Doctor"}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md  ${
                          appt.status === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {appt.status}
                      </span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-slate-400 text-xs font-medium">
                        Booked on {formatLocalTime(appt.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment Schedule */}
                <div className="flex items-center gap-6 px-4 py-2 bg-slate-50 rounded-xl md:w-auto w-full">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700">
                      {appt.appointment_time.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700">
                      {appt.appointment_time.slot.time}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end min-w-[120px]">
                  {appt.status !== "cancelled" ? (
                    <button
                      onClick={() => handleCancel(appt._id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 font-bold text-sm transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400 px-4 py-2 font-bold text-sm">
                      <XCircle className="w-4 h-4" />
                      Closed
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
