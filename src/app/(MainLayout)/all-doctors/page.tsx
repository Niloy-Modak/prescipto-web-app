import AllDocComponent from "@/components/pages/AllDoctor/AllDocComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perscripto | All Doctors Page",
  description: "All available doctor information for booking",
};

const AllDoctorPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AllDocComponent/>
    </section>
  );
};

export default AllDoctorPage;
