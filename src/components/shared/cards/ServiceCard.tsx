import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
};

const ServiceCard = ({ title, description, image }: ServiceCardProps) => {
  return (
    <article
      className="
        h-full flex flex-col
        rounded-2xl
        bg-white/40 backdrop-blur-md
        border border-white/20
        p-4 sm:p-5
        shadow-sm hover:shadow-md
        transition cursor-pointer
      "
    >
      {/* Image */}
      <div className="rounded-xl bg-gray-100">
        <div className="relative w-full aspect-4/3">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   25vw"
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-primary">
            {title}
          </h3>

          <p className="mt-2 text-sm sm:text-[15px] text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>

        <Link
          href="/"
          className="
            mt-4 inline-flex items-center gap-2
            text-sm font-medium text-primary
            transition-all hover:gap-3
          "
        >
          Learn more <span>→</span>
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
