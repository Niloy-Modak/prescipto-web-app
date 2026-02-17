import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " About Us",
  description: "About us page doctor of Prescripto",
};

const AboutPage = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative bg-primary-light max-w-7xl mx-auto   py-10 md:relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Revolutionizing Healthcare{" "}
              <span className="text-primary">Access for Everyone.</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              We believe that finding a doctor should be as easy as booking a
              flight. Our platform connects patients with top-rated healthcare
              professionals in just a few clicks.
            </p>

            <button className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-xl transition">
              Meet Our Doctors
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2 relative h-105 w-full">
            <Image
              src="/doctor_about_us.jpg"
              alt="Medical Professionals"
              fill
              priority
              className="rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16   bg-porcelain">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["10k+", "Verified Doctors"],
              ["500k+", "Happy Patients"],
              ["50+", "Specialties"],
              ["4.9", "App Rating"],
            ].map(([value, label]) => (
              <div key={label}>
                <h3 className="text-3xl font-bold text-primary">{value}</h3>
                <p className="text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-porcelain p-8 rounded-3xl">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed">
                To bridge the gap between patients and quality healthcare
                through innovative technology, ensuring transparency,
                convenience, and excellence in medical care.
              </p>
            </div>

            <div className="bg-primary p-8 rounded-3xl text-white">
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="opacity-90 leading-relaxed">
                To become the world’s most trusted digital health companion,
                empowering individuals to take control of their health journey
                anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
