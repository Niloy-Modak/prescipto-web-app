import ServiceCard from "@/components/shared/cards/ServiceCard";
import { services } from "@/lib/constants";

const ServicesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
          Our Medical Services
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-500">
          We provide a wide range of healthcare services using modern technology
          and experienced medical professionals.
        </p>
      </div>

      {/* Grid */}
      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
