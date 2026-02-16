"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Stethoscope,
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  ImageIcon,
  Save,
  Loader2,
  Award,
  Activity,
} from "lucide-react";

import Swal from "sweetalert2";
import { DoctorFormValues } from "@/types/DoctorFormValues";
import { uploadFileToBase64 } from "@/lib/uploadBase64";
import { useRouter } from "next/navigation";

/* ------------------ STYLES ------------------ */
const sectionStyle =
  "bg-white border border-slate-200 rounded-3xl px-2 py-4 md:p-4 lg:p-6 shadow-sm space-y-6";
const inputBase =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-700";
const labelStyle =
  "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1";

/* ------------------ HELPERS ------------------ */
const hours = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0"),
);
const minutes = ["00", "15", "30", "45"];
const periods = ["AM", "PM"];
const years = Array.from(
  { length: 60 },
  (_, i) => new Date().getFullYear() + 5 - i,
);

const YearSelect = ({
  register,
  name,
  disabled = false,
}: {
  register: any;
  name: string;
  disabled?: boolean;
}) => (
  <select
    {...register(name, { valueAsNumber: true })}
    disabled={disabled}
    className={`${inputBase} ${disabled ? "opacity-50 bg-slate-200" : ""}`}
  >
    <option value="">Select Year</option>
    {years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>
);

const TimePicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const safeValue = value || "09.00 AM";
  const [timePart, period] = safeValue.split(" ");
  const [hh, mm] = timePart.includes(".") ? timePart.split(".") : ["09", "00"];
  const updateTime = (newH: string, newM: string, newP: string) =>
    onChange(`${newH}.${newM} ${newP}`);

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

const TimeSlots = ({ nestIndex, control, register }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `availability.${nestIndex}.slots`,
  });
  return (
    <div className="mt-4 border-t border-dashed border-slate-200 pt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-slate-200"
          >
            <Controller
              control={control}
              name={`availability.${nestIndex}.slots.${index}.time`}
              render={({ field: { value, onChange } }) => (
                <TimePicker value={value} onChange={onChange} />
              )}
            />
            <div className="flex items-center justify-between border-t pt-2 border-slate-100 mt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register(
                    `availability.${nestIndex}.slots.${index}.isBooked`,
                  )}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase">
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
        <button
          type="button"
          onClick={() => append({ time: "09.00 AM", isBooked: false })}
          className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:text-primary hover:border-primary transition-all"
        >
          <Plus size={16} /> Add Slot
        </button>
      </div>
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */
interface Props {
  slug: string;
  onUpdateSuccess?: () => void;
}

export default function UpdateDoctorForm({ slug, onUpdateSuccess }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, control, handleSubmit, reset, watch, setValue } =
    useForm<DoctorFormValues>({
      defaultValues: {
        activeStatus: true,
        specializations: [],
        awards: [],
        education: [],
        workExperience: [],
        availability: [],
      },
    });

  const edu = useFieldArray({ control, name: "education" });
  const work = useFieldArray({ control, name: "workExperience" });
  const spec = useFieldArray({ control, name: "specializations" });
  const award = useFieldArray({ control, name: "awards" });
  const avail = useFieldArray({ control, name: "availability" });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctor/${slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch");

        const doctor = data.doctor;

        // Map data safely for Field Arrays
        const formattedData: any = {
          ...doctor,
          specializations:
            doctor.specializations?.map((s: string) => ({ value: s })) || [],
          awards: doctor.awards?.map((a: string) => ({ value: a })) || [],
          education: doctor.education || [],
          workExperience: doctor.workExperience || [],
          availability: doctor.availability || [],
        };

        reset(formattedData);
        if (doctor.doctorImage) setImagePreview(doctor.doctorImage);
      } catch (error) {
        Swal.fire("Error", "Failed to load doctor data", "error");
      } finally {
        setFetching(false);
      }
    };
    if (slug) fetchDoctor();
  }, [slug, reset]);

  const onSubmit = async (data: DoctorFormValues) => {
  try {
    setLoading(true);

    // 1. Handle the Image logic
    // We use the existing image from 'data' unless a new file was uploaded
    let base64Image = data.doctorImage;
    if (imageFile) {
      base64Image = await uploadFileToBase64(imageFile);
    }

    // 2. Define the 'payload' (This fixes the "Cannot find name 'payload'" error)
    const payload = {
      ...data,
      doctorImage: base64Image,
      specializations: data.specializations.map((s) => s.value),
      awards: data.awards.map((a) => a.value),
      yearsOfExperience: Number(data.yearsOfExperience),
      fee: Number(data.fee),
      slug: slug, // Explicitly include the slug so the API knows who to update
    };

    // 3. Send the request
    const res = await fetch(`/api/update-doctor-info/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Update failed");
    }

    // 4. Success UI
    await Swal.fire({
      title: "Updated!",
      text: "Profile updated successfully!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    // 5. Refresh the Server Components (Fixes the cache issue)
    router.refresh();

    // 6. Close the modal/Redirect
    onUpdateSuccess?.();

  } catch (err: any) {
    Swal.fire("Error", err.message, "error");
  } finally {
    setLoading(false);
  }
};

  if (fetching)
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-slate-500 font-medium">Loading Doctor Data...</p>
      </div>
    );

  return (
    <div className="min-h-screen sm:px-2 lg:px-8 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* 1. BASIC INFO */}
        <section className={sectionStyle}>
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Stethoscope className="text-primary" /> Basic Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyle}>Profile Image</label>
              <div className="flex flex-col items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="w-24 h-24 object-cover rounded-xl shadow-md border-2 border-white"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className={labelStyle}>Full Name</label>
              <input {...register("name")} className={inputBase} />
            </div>
            <div>
              <label className={labelStyle}>Title</label>
              <input {...register("title")} className={inputBase} />
            </div>
            <div>
              <label className={labelStyle}>Experience (Years)</label>
              <input
                type="number"
                {...register("yearsOfExperience")}
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelStyle}>Fee</label>
              <input type="number" {...register("fee")} className={inputBase} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyle}>Bio</label>
              <textarea {...register("bio")} rows={3} className={inputBase} />
            </div>
          </div>
        </section>

        {/* 2. EDUCATION */}
        <section className={sectionStyle}>
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
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
              className="bg-primary text-white p-2 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-all"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
          {edu.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 relative p-4 bg-slate-50 rounded-2xl border border-slate-100"
            >
              <div className="lg:col-span-4">
                <label className={labelStyle}>Degree</label>
                <input
                  {...register(`education.${index}.degree`)}
                  placeholder="e.g. MBBS"
                  className={inputBase}
                />
              </div>
              <div className="lg:col-span-4">
                <label className={labelStyle}>Institute</label>
                <input
                  {...register(`education.${index}.institute`)}
                  placeholder="University"
                  className={inputBase}
                />
              </div>
              <div className="lg:col-span-2">
                <label className={labelStyle}>Start Year</label>
                <YearSelect
                  register={register}
                  name={`education.${index}.startYear`}
                />
              </div>
              <div className="lg:col-span-2 relative">
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

        {/* 3. WORK EXPERIENCE */}
        <section className={sectionStyle}>
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
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
              className="bg-primary text-white p-2 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-all"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
          {work.fields.map((field, index) => {
            const currentEndYear = watch(`workExperience.${index}.endYear`);
            const isPresent = currentEndYear === null;
            return (
              <div
                key={field.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4 relative p-4 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <div className="lg:col-span-4">
                  <label className={labelStyle}>Position</label>
                  <input
                    {...register(`workExperience.${index}.position`)}
                    placeholder="e.g. Senior Surgeon"
                    className={inputBase}
                  />
                </div>
                <div className="lg:col-span-4">
                  <label className={labelStyle}>Workplace</label>
                  <input
                    {...register(`workExperience.${index}.workPlace`)}
                    placeholder="Hospital"
                    className={inputBase}
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className={labelStyle}>Start</label>
                  <YearSelect
                    register={register}
                    name={`workExperience.${index}.startYear`}
                  />
                </div>
                <div className="lg:col-span-2 relative">
                  <label className={labelStyle}>End</label>
                  <YearSelect
                    register={register}
                    name={`workExperience.${index}.endYear`}
                    disabled={isPresent}
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPresent}
                      onChange={(e) =>
                        setValue(
                          `workExperience.${index}.endYear`,
                          e.target.checked ? null : new Date().getFullYear(),
                        )
                      }
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      Present
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => work.remove(index)}
                    className="absolute -top-3 -right-2 bg-red-100 text-red-500 p-1.5 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* 4. SPECIALIZATIONS & AWARDS */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className={sectionStyle}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Activity size={20} className="text-primary" /> Specializations
              </h2>
              <button
                type="button"
                onClick={() => spec.append({ value: "" })}
                className="text-primary p-2"
              >
                <Plus size={20} />
              </button>
            </div>
            {spec.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`specializations.${index}.value`)}
                  className={inputBase}
                />
                <button
                  type="button"
                  onClick={() => spec.remove(index)}
                  className="text-slate-300 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </section>
          <section className={sectionStyle}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Award size={20} className="text-primary" /> Awards
              </h2>
              <button
                type="button"
                onClick={() => award.append({ value: "" })}
                className="text-primary p-2"
              >
                <Plus size={20} />
              </button>
            </div>
            {award.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`awards.${index}.value`)}
                  className={inputBase}
                />
                <button
                  type="button"
                  onClick={() => award.remove(index)}
                  className="text-slate-300 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </section>
        </div>

        {/* 5. AVAILABILITY */}
        <section className={sectionStyle}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Calendar className="text-primary" /> Availability
            </h2>
            <button
              type="button"
              onClick={() => avail.append({ date: "", slots: [] })}
              className="bg-primary text-white p-2 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-primary-hover transition-all"
            >
              <Plus size={18} /> Add Work Date
            </button>
          </div>
          <div className="space-y-6">
            {avail.fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 bg-slate-50 rounded-2xl border border-slate-200 relative"
              >
                <button
                  type="button"
                  onClick={() => avail.remove(index)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
                <div className="mb-4 max-w-xs">
                  <label className={labelStyle}>Select Date</label>
                  <input
                    type="date"
                    {...register(`availability.${index}.date`)}
                    className={inputBase}
                  />
                </div>
                <TimeSlots
                  nestIndex={index}
                  control={control}
                  register={register}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SUBMIT */}
        <div className="sticky bottom-8 px-8">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-primary text-white text-lg font-bold rounded-3xl shadow-2xl transition-all flex items-center justify-center gap-3 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-hover hover:-translate-y-1 active:scale-[0.98]"}`}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Save size={22} />
            )}{" "}
            {loading ? "Saving Changes..." : "Update Doctor Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
