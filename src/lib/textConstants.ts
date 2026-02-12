export const topDoctors = [
 {
    id: "dr-emily-chen-001",
    slug: "dr-emily-chen",
    name: "Dr. Emily Chen",
    title: "Board-Certified Cardiologist",
    yearsOfExperience: 15,
    bio: "Dr. Emily Chen is a board-certified cardiologist with extensive experience in heart disease prevention and treatment.",
    profileImage: "/doctors/image.png",
    specializations: [
      "Interventional Cardiology",
      "Heart Failure",
      "Preventive Cardiology",
    ],
    clinic: {
      name: "Heart & Vascular Institute",
      address: "New York, NY",
    },
    experience: [
      {
        position: "Senior Cardiologist",
        organization: "NY Presbyterian Hospital",
        startYear: 2018,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MD - Cardiology",
        institution: "Johns Hopkins University",
        startYear: 2006,
        endYear: 2010,
      },
    ],
    awards: [
      {
        title: "Top Doctor Award",
        year: 2022,
        description: "Outstanding patient care",
      },
    ],
    availability: {
      monday: ["08:00 AM", "09:00 AM"],
      wednesday: ["10:00 AM", "11:00 AM"],
    },
    fee: 50,
    activeStatus: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },

  {
    id: "dr-james-wilson-002",
    slug: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "Orthopedic Surgeon",
    yearsOfExperience: 12,
    bio: "Specialist in bone, joint, and sports injury treatments.",
    profileImage: "/doctors/image.png",
    specializations: ["Joint Replacement", "Sports Injuries"],
    clinic: {
      name: "Advanced Ortho Care",
      address: "Los Angeles, CA",
    },
    experience: [
      {
        position: "Consultant Orthopedic Surgeon",
        organization: "LA Medical Center",
        startYear: 2015,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MS - Orthopedics",
        institution: "UCLA",
        startYear: 2008,
        endYear: 2012,
      },
    ],
    availability: {
      tuesday: ["09:00 AM", "10:30 AM"],
      friday: ["02:00 PM", "04:00 PM"],
    },
    fee: 45,
    activeStatus: true,
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z",
  },

  {
    id: "dr-sarah-khan-003",
    slug: "dr-sarah-khan",
    name: "Dr. Sarah Khan",
    title: "Dermatologist",
    yearsOfExperience: 10,
    bio: "Expert in skin, hair, and cosmetic dermatology.",
    profileImage: "/doctors/image.png",
    specializations: ["Acne Treatment", "Cosmetic Dermatology"],
    clinic: {
      name: "Glow Skin Clinic",
      address: "Chicago, IL",
    },
    experience: [
      {
        position: "Senior Dermatologist",
        organization: "Glow Skin Clinic",
        startYear: 2017,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MD - Dermatology",
        institution: "University of Chicago",
        startYear: 2009,
        endYear: 2013,
      },
    ],
    availability: {
      monday: ["11:00 AM", "01:00 PM"],
      thursday: ["03:00 PM", "05:00 PM"],
    },
    fee: 40,
    activeStatus: true,
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-03T10:00:00Z",
  },

  {
    id: "dr-michael-brown-004",
    slug: "dr-michael-brown",
    name: "Dr. Michael Brown",
    title: "Neurologist",
    yearsOfExperience: 18,
    bio: "Treating neurological disorders with advanced diagnostics.",
    profileImage: "/doctors/image.png",
    specializations: ["Stroke Care", "Epilepsy"],
    clinic: {
      name: "Neuro Health Center",
      address: "Boston, MA",
    },
    experience: [
      {
        position: "Lead Neurologist",
        organization: "Neuro Health Center",
        startYear: 2012,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "DM - Neurology",
        institution: "Harvard Medical School",
        startYear: 2004,
        endYear: 2008,
      },
    ],
    availability: {
      wednesday: ["09:00 AM", "11:00 AM"],
      saturday: ["10:00 AM", "12:00 PM"],
    },
    fee: 60,
    activeStatus: true,
    createdAt: "2024-01-04T10:00:00Z",
    updatedAt: "2024-01-04T10:00:00Z",
  },
];

export const doctors = [
  {
    id: "dr-emily-chen-001",
    slug: "dr-emily-chen",
    name: "Dr. Emily Chen",
    title: "Board-Certified Cardiologist",
    yearsOfExperience: 15,
    bio: "Dr. Emily Chen is a board-certified cardiologist with extensive experience in heart disease prevention and treatment.",
    profileImage: "/doctors/image.png",
    specializations: [
      "Interventional Cardiology",
      "Heart Failure",
      "Preventive Cardiology",
    ],
    clinic: {
      name: "Heart & Vascular Institute",
      address: "New York, NY",
    },
    experience: [
      {
        position: "Senior Cardiologist",
        organization: "NY Presbyterian Hospital",
        startYear: 2018,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MD - Cardiology",
        institution: "Johns Hopkins University",
        startYear: 2006,
        endYear: 2010,
      },
    ],
    awards: [
      {
        title: "Top Doctor Award",
        year: 2022,
        description: "Outstanding patient care",
      },
    ],
    availability: {
      monday: ["08:00 AM", "09:00 AM"],
      wednesday: ["10:00 AM", "11:00 AM"],
    },
    fee: 50,
    activeStatus: true,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },

  {
    id: "dr-james-wilson-002",
    slug: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "Orthopedic Surgeon",
    yearsOfExperience: 12,
    bio: "Specialist in bone, joint, and sports injury treatments.",
    profileImage: "/doctors/image.png",
    specializations: ["Joint Replacement", "Sports Injuries"],
    clinic: {
      name: "Advanced Ortho Care",
      address: "Los Angeles, CA",
    },
    experience: [
      {
        position: "Consultant Orthopedic Surgeon",
        organization: "LA Medical Center",
        startYear: 2015,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MS - Orthopedics",
        institution: "UCLA",
        startYear: 2008,
        endYear: 2012,
      },
    ],
    availability: {
      tuesday: ["09:00 AM", "10:30 AM"],
      friday: ["02:00 PM", "04:00 PM"],
    },
    fee: 45,
    activeStatus: true,
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z",
  },

  {
    id: "dr-sarah-khan-003",
    slug: "dr-sarah-khan",
    name: "Dr. Sarah Khan",
    title: "Dermatologist",
    yearsOfExperience: 10,
    bio: "Expert in skin, hair, and cosmetic dermatology.",
    profileImage: "/doctors/image.png",
    specializations: ["Acne Treatment", "Cosmetic Dermatology"],
    clinic: {
      name: "Glow Skin Clinic",
      address: "Chicago, IL",
    },
    experience: [
      {
        position: "Senior Dermatologist",
        organization: "Glow Skin Clinic",
        startYear: 2017,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MD - Dermatology",
        institution: "University of Chicago",
        startYear: 2009,
        endYear: 2013,
      },
    ],
    availability: {
      monday: ["11:00 AM", "01:00 PM"],
      thursday: ["03:00 PM", "05:00 PM"],
    },
    fee: 40,
    activeStatus: true,
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-03T10:00:00Z",
  },

  {
    id: "dr-michael-brown-004",
    slug: "dr-michael-brown",
    name: "Dr. Michael Brown",
    title: "Neurologist",
    yearsOfExperience: 18,
    bio: "Treating neurological disorders with advanced diagnostics.",
    profileImage: "/doctors/image.png",
    specializations: ["Stroke Care", "Epilepsy"],
    clinic: {
      name: "Neuro Health Center",
      address: "Boston, MA",
    },
    experience: [
      {
        position: "Lead Neurologist",
        organization: "Neuro Health Center",
        startYear: 2012,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "DM - Neurology",
        institution: "Harvard Medical School",
        startYear: 2004,
        endYear: 2008,
      },
    ],
    availability: {
      wednesday: ["09:00 AM", "11:00 AM"],
      saturday: ["10:00 AM", "12:00 PM"],
    },
    fee: 60,
    activeStatus: true,
    createdAt: "2024-01-04T10:00:00Z",
    updatedAt: "2024-01-04T10:00:00Z",
  },

  {
    id: "dr-linda-rodriguez-005",
    slug: "dr-linda-rodriguez",
    name: "Dr. Linda Rodriguez",
    title: "Gynecologist",
    yearsOfExperience: 14,
    bio: "Focused on women’s health and prenatal care.",
    profileImage: "/doctors/image.png",
    specializations: ["Prenatal Care", "Women’s Health"],
    clinic: {
      name: "Women Care Hospital",
      address: "Miami, FL",
    },
    experience: [
      {
        position: "Senior Gynecologist",
        organization: "Women Care Hospital",
        startYear: 2016,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MD - Gynecology",
        institution: "University of Miami",
        startYear: 2006,
        endYear: 2010,
      },
    ],
    availability: {
      monday: ["10:00 AM", "12:00 PM"],
      friday: ["01:00 PM", "03:00 PM"],
    },
    fee: 35,
    activeStatus: true,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },

  {
    id: "dr-ahmed-hossain-006",
    slug: "dr-ahmed-hossain",
    name: "Dr. Ahmed Hossain",
    title: "General Physician",
    yearsOfExperience: 9,
    bio: "Providing comprehensive primary healthcare services.",
    profileImage: "/doctors/image.png",
    specializations: ["General Medicine", "Diabetes Care"],
    clinic: {
      name: "City Health Clinic",
      address: "Dhaka, Bangladesh",
    },
    experience: [
      {
        position: "General Physician",
        organization: "City Health Clinic",
        startYear: 2019,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MBBS",
        institution: "Dhaka Medical College",
        startYear: 2008,
        endYear: 2013,
      },
    ],
    availability: {
      sunday: ["09:00 AM", "12:00 PM"],
      tuesday: ["04:00 PM", "06:00 PM"],
    },
    fee: 20,
    activeStatus: true,
    createdAt: "2024-01-06T10:00:00Z",
    updatedAt: "2024-01-06T10:00:00Z",
  },

  {
    id: "dr-robert-lee-007",
    slug: "dr-robert-lee",
    name: "Dr. Robert Lee",
    title: "Pediatrician",
    yearsOfExperience: 11,
    bio: "Dedicated to child health and development.",
    profileImage: "/doctors/image.png",
    specializations: ["Child Care", "Vaccination"],
    clinic: {
      name: "Happy Kids Clinic",
      address: "San Francisco, CA",
    },
    experience: [
      {
        position: "Senior Pediatrician",
        organization: "Happy Kids Clinic",
        startYear: 2016,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MD - Pediatrics",
        institution: "Stanford University",
        startYear: 2007,
        endYear: 2011,
      },
    ],
    availability: {
      monday: ["09:00 AM", "11:00 AM"],
      thursday: ["02:00 PM", "04:00 PM"],
    },
    fee: 30,
    activeStatus: true,
    createdAt: "2024-01-07T10:00:00Z",
    updatedAt: "2024-01-07T10:00:00Z",
  },

  {
    id: "dr-nina-patel-008",
    slug: "dr-nina-patel",
    name: "Dr. Nina Patel",
    title: "Endocrinologist",
    yearsOfExperience: 13,
    bio: "Specialist in hormonal disorders and diabetes management.",
    profileImage: "/doctors/image.png",
    specializations: ["Diabetes", "Thyroid Disorders"],
    clinic: {
      name: "Endocrine Care Center",
      address: "Houston, TX",
    },
    experience: [
      {
        position: "Consultant Endocrinologist",
        organization: "Endocrine Care Center",
        startYear: 2014,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "DM - Endocrinology",
        institution: "Baylor College of Medicine",
        startYear: 2006,
        endYear: 2010,
      },
    ],
    availability: {
      wednesday: ["10:00 AM", "01:00 PM"],
      saturday: ["09:00 AM", "11:00 AM"],
    },
    fee: 55,
    activeStatus: true,
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
  },

  {
    id: "dr-david-smith-009",
    slug: "dr-david-smith",
    name: "Dr. David Smith",
    title: "ENT Specialist",
    yearsOfExperience: 16,
    bio: "Expert in ear, nose, and throat disorders.",
    profileImage: "/doctors/image.png",
    specializations: ["Hearing Loss", "Sinus Treatment"],
    clinic: {
      name: "ENT Care Center",
      address: "Seattle, WA",
    },
    experience: [
      {
        position: "ENT Specialist",
        organization: "ENT Care Center",
        startYear: 2011,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MS - ENT",
        institution: "University of Washington",
        startYear: 2003,
        endYear: 2007,
      },
    ],
    availability: {
      tuesday: ["09:00 AM", "11:00 AM"],
      friday: ["01:00 PM", "03:00 PM"],
    },
    fee: 42,
    activeStatus: true,
    createdAt: "2024-01-09T10:00:00Z",
    updatedAt: "2024-01-09T10:00:00Z",
  },

  {
    id: "dr-meera-sharma-010",
    slug: "dr-meera-sharma",
    name: "Dr. Meera Sharma",
    title: "Psychiatrist",
    yearsOfExperience: 17,
    bio: "Helping patients with mental health and emotional wellbeing.",
    profileImage: "/doctors/image.png",
    specializations: ["Depression", "Anxiety Disorders"],
    clinic: {
      name: "Mind Wellness Center",
      address: "Delhi, India",
    },
    experience: [
      {
        position: "Senior Psychiatrist",
        organization: "Mind Wellness Center",
        startYear: 2010,
        endYear: null,
      },
    ],
    education: [
      {
        degree: "MD - Psychiatry",
        institution: "AIIMS Delhi",
        startYear: 2001,
        endYear: 2005,
      },
    ],
    availability: {
      monday: ["04:00 PM", "06:00 PM"],
      saturday: ["10:00 AM", "12:00 PM"],
    },
    fee: 48,
    activeStatus: true,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
];

