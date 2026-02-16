export type DoctorFormValues = {
  name: string;
  slug: string;
  title?: string;
  yearsOfExperience?: number;
  bio?: string;
  doctorImage?: string;
  specializations: { value: string }[]; // Adjusted for FieldArray
  clinic: {
    name: string;
    address: string;
  };
  education: {
    degree: string;
    institute: string;
    startYear: number;
    endYear: number;
  }[];
  workExperience: {
    position: string;
    workPlace: string;
    startYear: number;
    endYear: number | null; // Null means "Present"
  }[];
  availability: {
    date: string;
    slots: {
      time: string;
      isBooked: boolean;
    }[];
  }[];
  awards: { value: string }[]; // Adjusted for FieldArray
  fee?: number;
  activeStatus: boolean;
};
