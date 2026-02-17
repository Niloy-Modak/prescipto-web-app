import AppointmentSection from "@/components/pages/landing/AppointmentSection";
import Banner from "@/components/pages/landing/Banner";
import DoctorPhilosophySection from "@/components/pages/landing/DoctorPhilosophySection";
import ServicesSection from "@/components/pages/landing/ServicesSection";
import TopDoctors from "@/components/pages/landing/TopDoctors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perscripto | Home Page",
  description: "Prescripto a doctor appointment booking web app project",
};

export default function Home() {
  return (
    <section className="">
      <Banner/>
      <TopDoctors/>
      <ServicesSection/>
      <DoctorPhilosophySection/>
      <AppointmentSection/>
      
    </section>
  );
}
