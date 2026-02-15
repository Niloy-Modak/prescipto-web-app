"use client";

import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  Control,
  UseFormRegister,
  Controller,
} from "react-hook-form";

import {
  Stethoscope,
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  ImageIcon,
} from "lucide-react";
import { DoctorFormValues } from "@/types/DoctorFormValues";
import { uploadFileToBase64 } from "@/lib/uploadBase64";
import Swal from "sweetalert2";

/* --- SHARED STYLES --- */
const sectionStyle =
  "bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6";
const inputBase =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-700";
const labelStyle =
  "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1";

/* --- HELPER DATA --- */
const hours = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0"),
);
const minutes = ["00", "15", "30", "45"];
const periods = ["AM", "PM"];

/* --- SUB-COMPONENT: TIME PICKER --- */
const TimePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const safeValue = value || "09.00 AM";
  const [timePart, period] = safeValue.split(" ");
  const [hh, mm] = timePart.split(".");

  const updateTime = (newH: string, newM: string, newP: string) => {
    // This creates the exact string format you want for your database
    onChange(`${newH}.${newM} ${newP}`);
  };

  return (
    <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
      <select
        value={hh}
        onChange={(e) => updateTime(e.target.value, mm, period)}
        className="bg-transparent text-sm font-bold outline-none cursor-pointer"
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <span className="text-slate-400 font-bold">.</span>
      <select
        value={mm}
        onChange={(e) => updateTime(hh, e.target.value, period)}
        className="bg-transparent text-sm font-bold outline-none cursor-pointer"
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={period}
        onChange={(e) => updateTime(hh, mm, e.target.value)}
        className="bg-transparent text-[10px] font-black text-primary outline-none cursor-pointer ml-1"
      >
        {periods.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
};

/* --- HELPER: YEAR GENERATOR --- */
const years = Array.from(
  { length: 60 },
  (_, i) => new Date().getFullYear() + 5 - i,
); // From 5 years in future back 60 years

/* --- COMPONENT: YEAR SELECTOR --- */
const YearSelect = ({
  register,
  name,
  disabled = false,
}: {
  register: any;
  name: string;
  disabled?: boolean;
}) => (
  <div className="relative">
    <select
      {...register(name, { valueAsNumber: true })}
      disabled={disabled}
      className={`${inputBase} appearance-none ${disabled ? "opacity-50 cursor-not-allowed bg-slate-200" : ""}`}
    >
      <option value="">Select Year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
    {/* Chevron Icon for Select */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L5 5L9 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

/* --- SUB-COMPONENT: TIME SLOTS --- */
const TimeSlots = ({ nestIndex, control, register }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `availability.${nestIndex}.slots`,
  });

  return (
    <div className="mt-4 border-t border-dashed border-slate-200 pt-5">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">
        Daily Time Slots
      </h3>

      {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex  flex-col  justify-between gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:border-blue-200 transition-all group"
          >
            <Controller
              control={control}
              name={`availability.${nestIndex}.slots.${index}.time`}
              render={({ field: { value, onChange } }) => (
                <TimePicker value={value} onChange={onChange} />
              )}
            />

            <div className="flex items-center gap-2 border-l pt-2 border-slate-100">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register(
                    `availability.${nestIndex}.slots.${index}.isBooked`,
                  )}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 uppercase">
                  Booked
                </span>
              </label>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* "Add Slot" button stays inside the grid as a card */}
        <button
          type="button"
          onClick={() => append({ time: "09.00 AM", isBooked: false })}
          className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary hover:text-primary-hover hover:bg-blue-50/50 transition-all text-xs font-bold"
        >
          <Plus size={16} /> Add Slot
        </button>
      </div>
    </div>
  );
};

export default function CreateDoctorForm() {
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit, watch, setValue, reset } =
    useForm<DoctorFormValues>({
      defaultValues: {
        activeStatus: true,
        specializations: [{ value: "" }],
        awards: [{ value: "" }],
        education: [
          { degree: "", institute: "", startYear: 2020, endYear: 2024 },
        ],
        workExperience: [
          { position: "", workPlace: "", startYear: 2020, endYear: null },
        ],
        availability: [
          { date: "", slots: [{ time: "09.00 AM", isBooked: false }] },
        ],
      },
    });

  const edu = useFieldArray({ control, name: "education" });
  const work = useFieldArray({ control, name: "workExperience" });
  const spec = useFieldArray({ control, name: "specializations" });
  const award = useFieldArray({ control, name: "awards" });
  const avail = useFieldArray({ control, name: "availability" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  //----- Submit data ------
  const onSubmit = async (data: DoctorFormValues) => {
    try {
      setLoading(true); // start loading

      // Convert file to base64
      let base64Image = "";
      if (imageFile) base64Image = await uploadFileToBase64(imageFile);

      const payload = {
        ...data,
        doctorImage: base64Image,
        specializations: data.specializations.map((s) => s.value),
        awards: data.awards.map((a) => a.value),
        yearsOfExperience: Number(data.yearsOfExperience),
        fee: Number(data.fee),
      };

      const res = await fetch("/api/add-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed");

      // Success alert
      Swal.fire({
        title: "Success!",
        text: "Doctor successfully created!",
        icon: "success",
        confirmButtonColor: "#007E85",
      });

      // ✅ Reset form and image
      setImageFile(null); // clear image preview
      reset(); // react-hook-form reset all fields
    } catch (err) {
      Swal.fire({
        text: (err as any).message,
        icon: "error",
        confirmButtonColor: "#007E85",
      });
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen  py-12 md:px-4 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div className="mb-10 text-center">
          <h1 className="lg:text-3xl text-2xl font-medium text-primary tracking-tight">
            Professional Doctor Onboarding
          </h1>
          <p className="text-slate-500 mt-2 text-xs md:text-2xs md:text-lg">
            Complete the profile details below. Use the year selectors for
            accuracy.
          </p>
        </div>

        {/* 1. BASIC INFO */}
        <section className={sectionStyle}>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Stethoscope className="text-primary" /> Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className={labelStyle}>Full Name</label>
              <input
                {...register("name")}
                className={inputBase}
                placeholder="Dr. John Doe"
              />
            </div>

            {/* Title */}
            <div>
              <label className={labelStyle}>Title</label>
              <input
                {...register("title")}
                className={inputBase}
                placeholder="Senior Cardiologist"
              />
            </div>

            {/* Experience of Year*/}
            <div>
              <label className={labelStyle}>Years of Experience</label>
              <input
                type="number"
                min="0" // Prevents the browser's "up/down" arrows from going below 0
                {...register("yearsOfExperience", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Experience cannot be negative",
                  },
                })}
                onKeyDown={(e) => {
                  // Prevents the user from manually typing the minus "-" key
                  if (e.key === "-") {
                    e.preventDefault();
                  }
                }}
                className={inputBase}
                placeholder="e.g. 12"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className={labelStyle}>Doctor Profile Image</label>
              <div className="group relative">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 hover:border-primary transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 text-slate-400 mb-2 group-hover:text-primary" />
                      <p className="text-sm text-slate-500 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-400 uppercase tracking-tighter mt-1">
                        PNG, JPG or WEBP (MAX. 2MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </label>
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-32 h-32 object-cover rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* Set Bio */}
            <div className="md:col-span-2">
              <label className={labelStyle}>Short Bio</label>
              <textarea
                {...register("bio")}
                rows={3}
                className={inputBase}
                placeholder="Brief professional biography..."
              />
            </div>
          </div>
        </section>

        {/* 2. CLINIC & PRICING */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Clinic location */}
          <section className={sectionStyle}>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <MapPin className="text-primary" /> Clinic Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelStyle}>Clinic Name</label>
                <input {...register("clinic.name")} className={inputBase} />
              </div>
              <div>
                <label className={labelStyle}>Address</label>
                <input {...register("clinic.address")} className={inputBase} />
              </div>
            </div>
          </section>

          {/* Price */}
          <section className={sectionStyle}>
            <div>
              <label className={labelStyle}>Fee</label>
              <input
                type="number"
                min="0" // Prevents the browser's "up/down" arrows from going below 0
                {...register("fee", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Experience cannot be negative",
                  },
                })}
                onKeyDown={(e) => {
                  // Prevents the user from manually typing the minus "-" key
                  if (e.key === "-") {
                    e.preventDefault();
                  }
                }}
                className={inputBase}
                placeholder="Enter Fee"
              />
            </div>

            {/* Active status */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mt-6 cursor-pointer hover:bg-slate-100 transition-all border border-slate-200">
              <span className="font-bold text-sm text-slate-700">
                Active Profile
              </span>
              <input
                type="checkbox"
                {...register("activeStatus")}
                className="w-6 h-6 accent-primary rounded-lg"
              />
            </label>
          </section>
        </div>

        {/* 3. EDUCATION */}
        <section className={sectionStyle}>
          <div className="flex flex-col md:flex-row md:justify-between gap-3 md:items-center border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <GraduationCap className="text-primary" /> Education
            </h2>
            <button
              type="button"
              onClick={() =>
                edu.append({
                  degree: "",
                  institute: "",
                  startYear: 2020,
                  endYear: 2024,
                })
              }
              className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-primary-hover cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-2"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
          {edu.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-2xl relative mb-4"
            >
              <div className="md:col-span-4">
                <label className={labelStyle}>Degree</label>
                <input
                  {...register(`education.${index}.degree`)}
                  placeholder="e.g. MBBS"
                  className={inputBase}
                />
              </div>
              <div className="md:col-span-4">
                <label className={labelStyle}>Institute</label>
                <input
                  {...register(`education.${index}.institute`)}
                  placeholder="University Name"
                  className={inputBase}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelStyle}>Start Year</label>
                <YearSelect
                  register={register}
                  name={`education.${index}.startYear`}
                />
              </div>
              <div className="md:col-span-2 relative">
                <label className={labelStyle}>End Year</label>
                <YearSelect
                  register={register}
                  name={`education.${index}.endYear`}
                />
                <button
                  type="button"
                  onClick={() => edu.remove(index)}
                  className="absolute -top-3 -right-2 bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* 4. WORK EXPERIENCE (INTELLIGENT FIX: PRESENT CHECKBOX) */}
        <section className={sectionStyle}>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
              <Briefcase className="text-primary" /> Work Experience
            </h2>
            <button
              type="button"
              onClick={() =>
                work.append({
                  position: "",
                  workPlace: "",
                  startYear: 2022,
                  endYear: null,
                })
              }
              className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-primary-hover cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-2"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
          {work.fields.map((field, index) => {
            // Watch the endYear field to determine if we are "Present"
            const currentEndYear = watch(`workExperience.${index}.endYear`);
            const isPresent = currentEndYear === null;

            return (
              <div
                key={field.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4   rounded-2xl relative mb-4 "
              >
                <div className="md:col-span-4">
                  <label className={labelStyle}>Position</label>
                  <input
                    {...register(`workExperience.${index}.position`)}
                    placeholder="e.g. Senior Surgeon"
                    className={inputBase}
                  />
                </div>
                <div className="md:col-span-4">
                  <label className={labelStyle}>Workplace</label>
                  <input
                    {...register(`workExperience.${index}.workPlace`)}
                    placeholder="Hospital Name"
                    className={inputBase}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Start Year</label>
                  <YearSelect
                    register={register}
                    name={`workExperience.${index}.startYear`}
                  />
                </div>
                <div className="md:col-span-2 relative">
                  <label className={labelStyle}>End Year</label>
                  <YearSelect
                    register={register}
                    name={`workExperience.${index}.endYear`}
                    disabled={isPresent}
                  />

                  {/* "Currently Working" Toggle */}
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPresent}
                      onChange={(e) => {
                        // If checked, set to null (Present). If unchecked, set to current year.
                        setValue(
                          `workExperience.${index}.endYear`,
                          e.target.checked ? null : new Date().getFullYear(),
                        );
                      }}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-[10px]  font-bold text-slate-500 uppercase tracking-wide">
                      Present
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => work.remove(index)}
                    className="absolute -top-3 -right-2 cursor-pointer bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* 5. SPECIALIZATIONS & AWARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className={sectionStyle}>
            <h2 className="text-lg font-bold flex justify-between items-center text-slate-800">
              Specializations
              <button
                type="button"
                onClick={() => spec.append({ value: "" })}
                className="text-primary cursor-pointer bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={18} />
              </button>
            </h2>
            <div className="space-y-3 mt-4">
              {spec.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`specializations.${index}.value`)}
                    className={inputBase}
                    placeholder="e.g. Dermatology"
                  />
                  <button
                    type="button"
                    onClick={() => spec.remove(index)}
                    className="text-red-300 cursor-pointer hover:text-red-500 hover:bg-red-50 px-2 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Awards section */}
          <section className={sectionStyle}>
            <h2 className="text-lg font-bold flex justify-between items-center text-slate-800">
              Awards
              <button
                type="button"
                onClick={() => award.append({ value: "" })}
                className="text-primary cursor-pointer bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={18} />
              </button>
            </h2>
            <div className="space-y-3 mt-4">
              {award.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`awards.${index}.value`)}
                    className={inputBase}
                    placeholder="e.g. Best Surgeon 2023"
                  />
                  <button
                    type="button"
                    onClick={() => award.remove(index)}
                    className="text-red-300 cursor-pointer hover:text-red-500 hover:bg-red-50 px-2 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 6. AVAILABILITY SECTION */}
        <section className={`${sectionStyle} px-4 sm:px-6`}>
          {/* Header: Stacks on mobile, row on tablet+ */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 text-slate-800">
              <Calendar className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              Availability
            </h2>
            <button
              type="button"
              onClick={() =>
                avail.append({
                  date: "",
                  slots: [{ time: "09.00 AM", isBooked: false }],
                })
              }
              className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-primary-hover cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-2"
            >
              <Plus size={18} /> Add Date
            </button>
          </div>

          <div className="space-y-6">
            {avail.fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-3xl relative border border-slate-200 shadow-sm transition-all"
              >
                {/* Remove Button: Positioned for easy thumb access on mobile */}
                <button
                  type="button"
                  onClick={() => avail.remove(index)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                  title="Remove Date"
                >
                  <Trash2 size={20} />
                </button>

                {/* Date Input: Full width on mobile, restricted on desktop */}
                <div className="w-full sm:max-w-xs mb-6">
                  <label className={`${labelStyle} block mb-1.5`}>
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      {...register(`availability.${index}.date`)}
                      className={`${inputBase} w-full focus:ring-2 focus:ring-primary/20 transition-all`}
                    />
                  </div>
                </div>

                {/* Nested Time Slots Grid */}
                <div className="mt-2">
                  <TimeSlots
                    nestIndex={index}
                    control={control}
                    register={register}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {avail.fields.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-3xl">
              <p className="text-slate-400 text-sm">
                No availability dates added yet.
              </p>
            </div>
          )}
        </section>

        <button
          type="submit"
          className={`w-full py-3 bg-primary text-white text-lg font-medium rounded-3xl shadow-xl shadow-blue-200 transition-all 
  ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-hover hover:-translate-y-1"}`}
        >
          {loading ? "Profile Creating..." : "Publish Profile"}
        </button>
      </form>
    </div>
  );
}
