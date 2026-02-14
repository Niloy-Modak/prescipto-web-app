export type DoctorType = {
  id: string;
  slug: string;
  name: string;
  title: string;
  yearsOfExperience: number;
  bio: string;

  // 🔄 renamed to match your data
  doctorImage: string;

  specializations: string[];

  clinic: {
    name: string;
    address: string;
  };

  // (optional – you can remove if not used yet)
  experience?: {
    position: string;
    organization: string;
    startYear: number;
    endYear: number | null;
  }[];

  // (optional – you can remove if not used yet)
  education?: {
    degree: string;
    institution: string;
    startYear: number;
    endYear: number;
  }[];

  awards?: {
    title: string;
    year: number;
    description?: string;
  }[];

  // ✅ FIXED availability structure
  availability: {
    date: string; // "YYYY-MM-DD"
    slots: {
      time: string; // "HH:mm"
      isBooked: boolean;
    }[];
  }[];

  fee: number;
  activeStatus: boolean;
};
