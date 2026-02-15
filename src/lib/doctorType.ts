export type DoctorType = {
  _id: string; // MongoDB uses _id by default
  slug: string;
  name: string;
  title?: string; // Optional in schema
  yearsOfExperience?: number; // Optional in schema
  bio?: string;
  doctorImage: string; // Required
  specializations: string[]; // Required (min 1)

  clinic: {
    name: string;
    address: string;
  };

  // Renamed to match schema 'education'
  education: {
    degree: string;
    institute: string; // Changed from institution
    startYear: number;
    endYear: number;
  }[];

  // Matches schema 'workExperience'
  workExperience: {
    position: string;
    workPlace: string; // Changed from organization
    startYear: number;
    endYear: number | null; // null = Present
  }[];

  // Matches schema 'awards' (Array of strings)
  awards: string[];

  // Matches schema 'availability'
  availability: {
    date: string;
    slots: {
      time: string;
      isBooked: boolean;
    }[];
  }[];

  fee: number;
  activeStatus: boolean;
  createdAt?: string;
  updatedAt?: string;
};
