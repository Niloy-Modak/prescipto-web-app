"use client";
import React, { useState } from "react";

interface Slot {
  time: string;
  isBooked: boolean;
}

interface Availability {
  date: string;
  slots: Slot[];
}

export default function BookingSection({
  availability,
}: {
  availability: Availability[];
}) {
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div className=" rounded-2xl p-8 border  border-porcelain/20 bg-porcelain/30 backdrop-blur-md shadow-sm mt-6">
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
                  : "bg-white border-slate-200 text-slate-600 hover:border-primary-hover cursor-pointer"
              }`}
            >
              <span className="text-xs font-bold mb-1">{dayName}</span>
              <span className="text-lg font-bold">{dayNum}</span>
            </button>
          );
        })}
      </div>

      {/* Time Slots Selection */}
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

      {selectedTime && (
        <button className="mt-8 w-full md:w-auto px-10 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-all shadow-lg shadow-blue-100 cursor-pointer">
          Book Appointment for {selectedTime}
        </button>
      )}
    </div>
  );
}
