"use client";

import React, { useEffect, useState, useTransition } from "react";
import Swal from "sweetalert2";
import {
  Loader2,
  CalendarX,
  Mail,
  Phone,
  Stethoscope,
  Calendar,
  Clock,
  ChevronDown,
  CheckCircle2,
  CircleDot,
  XCircle,
} from "lucide-react";

type AppointmentStatus = "pending" | "confirmed" | "cancelled";

interface Appointment {
  _id: string;
  patient_name: string;
  email: string;
  phone: string;
  gender: string;
  describe_problem: string;
  doctor_name: string;
  doctor_slug: string;
  appointment_time: {
    date: string;
    slot: {
      time: string;
    };
  };
  status: AppointmentStatus;
}

const statusStyles: Record<AppointmentStatus, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200 focus:ring-amber-500",
  confirmed:
    "bg-emerald-100 text-emerald-700 border-emerald-200 focus:ring-emerald-500",
  cancelled: "bg-rose-100 text-rose-700 border-rose-200 focus:ring-rose-500",
};

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // 🔹 Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔹 Update status with Confirmation & Success
  const handleStatusChange = async (
    id: string,
    newStatus: AppointmentStatus,
  ) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this appointment as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      startTransition(async () => {
        // Optimistic UI update
        setAppointments((prev) =>
          prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a)),
        );

        try {
          const res = await fetch(`/api/admin/appointments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          });

          if (!res.ok) throw new Error("Failed to update status");

          Swal.fire({
            title: "Success!",
            text: "Status successfully updated.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire("Error", "Failed to update status", "error");
          fetchAppointments(); // Rollback to real database state
        }
      });
    }
  };

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Appointments
        </h2>
        <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-xs font-bold">
          {appointments.length} Total
        </span>
      </div>

      {/* 🔹 Empty State */}
      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-500 space-y-3">
          <CalendarX className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
          <p className="text-lg font-medium">No appointments found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Patient Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {appointments.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-slate-50/80 transition-colors duration-150"
                >
                  {/* Patient Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1.5">
                      <span className="font-semibold text-slate-900">
                        {app.patient_name}
                      </span>
                      <div className="flex items-center text-sm text-slate-500 gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{app.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-slate-400 gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{app.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Doctor Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <Stethoscope className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-slate-700">
                        {app.doctor_name}
                      </span>
                    </div>
                  </td>

                  {/* Date & Time Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center text-sm font-medium text-slate-800 gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{app.appointment_time.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500 gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{app.appointment_time.slot.time}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 text-center">
                    <div className="relative group min-w-[140px] inline-block">
                      {/* Status Icon Overlay (Left Side) */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-current opacity-70">
                        {app.status === "pending" && (
                          <CircleDot className="h-4 w-4 animate-pulse" />
                        )}
                        {app.status === "confirmed" && (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                        {app.status === "cancelled" && (
                          <XCircle className="h-4 w-4" />
                        )}
                      </div>

                      <select
                        value={app.status}
                        disabled={isPending}
                        onChange={(e) =>
                          handleStatusChange(
                            app._id,
                            e.target.value as AppointmentStatus,
                          )
                        }
                        className={`
        appearance-none cursor-pointer w-full pl-9 pr-10 py-2 rounded-xl text-xs font-black outline-none 
        border transition-all duration-200 shadow-sm
        focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${statusStyles[app.status]}
      `}
                      >
                        <option
                          value="pending"
                          className="bg-white text-slate-700"
                        >
                          Pending
                        </option>
                        <option
                          value="confirmed"
                          className="bg-white text-slate-700"
                        >
                          Confirmed
                        </option>
                        <option
                          value="cancelled"
                          className="bg-white text-slate-700"
                        >
                          Cancelled
                        </option>
                      </select>

                      {/* Custom Arrow Icon (Right Side) */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;
