import Image from "next/image";

const DoctorPhilosophySection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Dedicated to Your Long-Term Wellness
          </h2>

          <div className="space-y-5 text-gray-600">
            <p className="text-lg leading-relaxed">
              With over 15 years of experience in internal medicine, Dr. Smith
              believes in a holistic approach to healthcare. He completed his
              residency at Johns Hopkins and has since dedicated his career to
              preventative care and community health.
            </p>

            <div className="bg-porcelain border-l-4 border-primary p-6 rounded-r-lg">
              <p className="text-gray-800 italic text-lg">
                “My philosophy is simple: listen to the patient first.
                Understanding your lifestyle and concerns is the first step
                towards accurate diagnosis and effective treatment.”
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="order-1 lg:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/patients-consulting-with-doctor.png"
              alt="Doctor sitting across from two patients during a consultation"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-sm font-medium">
               
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorPhilosophySection;
