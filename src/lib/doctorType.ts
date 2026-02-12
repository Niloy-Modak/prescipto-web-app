export type DoctorType = {
  id: string;
  slug: string;
  name: string;
  title: string;
  yearsOfExperience: number;
  bio: string;
  profileImage: string;

  specializations: string[];

  clinic: {
    name: string;
    address: string;
  };

  experience: {
    position: string;
    organization: string;
    startYear: number;
    endYear: number | null;
  }[];

  education: {
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

  availability: {
    [day: string]: string[];
  };

  fee: number;

  activeStatus: boolean; // ✅ changed
  createdAt: string;
  updatedAt: string;
};
