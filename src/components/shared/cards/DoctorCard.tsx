import Image from "next/image";
import Link from "next/link";

type DoctorCardProps = {
  slug: string;
  name: string;
  title: string;
  doctorImage: string;
  specializations: string[];
  activeStatus: boolean;
};

const DoctorCard = ({
  name,
  title,
  doctorImage,
  specializations,
  activeStatus,
  slug,
}: DoctorCardProps) => {
  return (
    <>
      <Link href={`/doctor/${slug}`}>
        <div
          className=" w-full max-w-sm cursor-pointer
        flex flex-col h-full rounded-2xl overflow-hidden
        bg-porcelain/40 backdrop-blur-md
        border border-porcelain/20
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
        transition-all duration-300
        hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]
        hover:-translate-y-1
      "
        >
          {/* Image */}
          <div className="relative h-56 w-full">
            <Image src={doctorImage} alt={name} fill className="object-cover" />
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full
    ${activeStatus ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
  `}
            >
              {activeStatus ? "Active" : "Inactive"}
            </span>

            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{title}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {specializations.slice(0, 3).map((spec) => (
                <span
                  key={spec}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default DoctorCard;
