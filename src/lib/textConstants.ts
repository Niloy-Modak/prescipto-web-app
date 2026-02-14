export const topDoctors = [
  {
    id: "dr-emily-chen-001",
    slug: "dr-emily-chen-interventional-cardiology",
    name: "Dr. Emily Chen",
    title: "Board-Certified Cardiologist",
    yearsOfExperience: 15,
    bio: "Dr. Emily Chen specializes in advanced cardiac procedures and preventive cardiology.",
    doctorImage: "/doctors/image.png",
    specializations: [
      "Interventional Cardiology",
      "Heart Failure",
      "Preventive Cardiology",
    ],
    clinic: {
      name: "Heart & Vascular Institute",
      address: "New York, NY",
    },
    availability: [
      {
        date: "2026-02-14",
        slots: [
          { time: "08:00", isBooked: false },
          { time: "09:00", isBooked: true },
        ],
      },
      {
        date: "2026-02-15",
        slots: [
          { time: "11:00", isBooked: false },
          { time: "12:00", isBooked: false },
        ],
      },
    ],
    fee: 50,
    activeStatus: true,
  },

  {
    id: "dr-james-wilson-002",
    slug: "dr-james-wilson-orthopedic-surgeon",
    name: "Dr. James Wilson",
    title: "Orthopedic Surgeon",
    yearsOfExperience: 18,
    bio: "Expert in joint replacement and sports injury management.",
    doctorImage: "/doctors/image.png",
    specializations: ["Joint Replacement", "Sports Injuries"],
    clinic: {
      name: "Advanced Ortho Care",
      address: "Chicago, IL",
    },
    availability: [
      {
        date: "2026-02-16",
        slots: [
          { time: "10:00", isBooked: false },
          { time: "11:00", isBooked: false },
        ],
      },
    ],
    fee: 60,
    activeStatus: true,
  },

  {
    id: "dr-sophia-lee-003",
    slug: "dr-sophia-lee-dermatology",
    name: "Dr. Sophia Lee",
    title: "Consultant Dermatologist",
    yearsOfExperience: 12,
    bio: "Focused on skin health, cosmetic dermatology, and laser treatments.",
    doctorImage: "/doctors/image.png",
    specializations: ["Dermatology", "Cosmetic Treatments"],
    clinic: {
      name: "Skin Health Clinic",
      address: "Los Angeles, CA",
    },
    availability: [
      {
        date: "2026-02-17",
        slots: [
          { time: "09:30", isBooked: false },
          { time: "10:30", isBooked: false },
        ],
      },
    ],
    fee: 45,
    activeStatus: true,
  },

  {
    id: "dr-michael-brown-004",
    slug: "dr-michael-brown-neurology",
    name: "Dr. Michael Brown",
    title: "Neurologist",
    yearsOfExperience: 20,
    bio: "Treats complex neurological disorders with a patient-first approach.",
    doctorImage: "/doctors/image.png",
    specializations: ["Neurology", "Stroke Care"],
    clinic: {
      name: "Brain & Nerve Center",
      address: "Boston, MA",
    },
    availability: [
      {
        date: "2026-02-18",
        slots: [
          { time: "14:00", isBooked: false },
          { time: "15:00", isBooked: true },
        ],
      },
    ],
    fee: 70,
    activeStatus: true,
  },
];

export const doctors = [
  {
    id: "dr-emily-chen-001",
    slug: "dr-emily-chen-interventional-cardiology",
    name: "Dr. Emily Chen",
    title: "Board-Certified Cardiologist",
    yearsOfExperience: 15,
    bio: "Dr. Emily Chen specializes in advanced cardiac procedures and preventive cardiology.",
    doctorImage: "/doctors/image.png",
    specializations: [
      "Interventional Cardiology",
      "Heart Failure",
      "Preventive Cardiology",
    ],
    clinic: {
      name: "Heart & Vascular Institute",
      address: "New York, NY",
    },
    availability: [
      {
        date: "2026-02-14",
        slots: [
          { time: "08:00", isBooked: false },
          { time: "09:00", isBooked: true },
        ],
      },
      {
        date: "2026-02-15",
        slots: [
          { time: "11:00", isBooked: false },
          { time: "12:00", isBooked: false },
        ],
      },
    ],
    fee: 50,
    activeStatus: true,
  },

  {
    id: "dr-james-wilson-002",
    slug: "dr-james-wilson-orthopedic-surgeon",
    name: "Dr. James Wilson",
    title: "Orthopedic Surgeon",
    yearsOfExperience: 18,
    bio: "Expert in joint replacement and sports injury management.",
    doctorImage: "/doctors/image.png",
    specializations: ["Joint Replacement", "Sports Injuries"],
    clinic: {
      name: "Advanced Ortho Care",
      address: "Chicago, IL",
    },
    availability: [
      {
        date: "2026-02-16",
        slots: [
          { time: "10:00", isBooked: false },
          { time: "11:00", isBooked: false },
        ],
      },
    ],
    fee: 60,
    activeStatus: true,
  },

  {
    id: "dr-sophia-lee-003",
    slug: "dr-sophia-lee-dermatology",
    name: "Dr. Sophia Lee",
    title: "Consultant Dermatologist",
    yearsOfExperience: 12,
    bio: "Focused on skin health, cosmetic dermatology, and laser treatments.",
    doctorImage: "/doctors/image.png",
    specializations: ["Dermatology", "Cosmetic Treatments"],
    clinic: {
      name: "Skin Health Clinic",
      address: "Los Angeles, CA",
    },
    availability: [
      {
        date: "2026-02-17",
        slots: [
          { time: "09:30", isBooked: false },
          { time: "10:30", isBooked: false },
        ],
      },
    ],
    fee: 45,
    activeStatus: true,
  },

  {
    id: "dr-michael-brown-004",
    slug: "dr-michael-brown-neurology",
    name: "Dr. Michael Brown",
    title: "Neurologist",
    yearsOfExperience: 20,
    bio: "Treats complex neurological disorders with a patient-first approach.",
    doctorImage: "/doctors/image.png",
    specializations: ["Neurology", "Stroke Care"],
    clinic: {
      name: "Brain & Nerve Center",
      address: "Boston, MA",
    },
    availability: [
      {
        date: "2026-02-18",
        slots: [
          { time: "14:00", isBooked: false },
          { time: "15:00", isBooked: true },
        ],
      },
    ],
    fee: 70,
    activeStatus: true,
  },

  {
    id: "dr-olivia-martin-005",
    slug: "dr-olivia-martin-pediatrics",
    name: "Dr. Olivia Martin",
    title: "Pediatric Specialist",
    yearsOfExperience: 10,
    bio: "Dedicated to comprehensive healthcare for infants and children.",
    doctorImage: "/doctors/image.png",
    specializations: ["Pediatrics", "Child Nutrition"],
    clinic: {
      name: "Happy Kids Clinic",
      address: "Austin, TX",
    },
    availability: [
      {
        date: "2026-02-19",
        slots: [
          { time: "09:00", isBooked: false },
          { time: "10:00", isBooked: false },
        ],
      },
    ],
    fee: 40,
    activeStatus: true,
  },

  {
    id: "dr-david-kim-006",
    slug: "dr-david-kim-endocrinology",
    name: "Dr. David Kim",
    title: "Endocrinologist",
    yearsOfExperience: 14,
    bio: "Specialist in diabetes, thyroid, and metabolic disorders.",
    doctorImage: "/doctors/image.png",
    specializations: ["Diabetes Care", "Thyroid Disorders"],
    clinic: {
      name: "Metabolic Health Center",
      address: "San Jose, CA",
    },
    availability: [
      {
        date: "2026-02-20",
        slots: [
          { time: "13:00", isBooked: false },
          { time: "14:00", isBooked: false },
        ],
      },
    ],
    fee: 55,
    activeStatus: true,
  },

  {
    id: "dr-natalie-ross-007",
    slug: "dr-natalie-ross-psychiatry",
    name: "Dr. Natalie Ross",
    title: "Consultant Psychiatrist",
    yearsOfExperience: 16,
    bio: "Helping patients manage mental health with empathy and care.",
    doctorImage: "/doctors/image.png",
    specializations: ["Psychiatry", "Anxiety & Depression"],
    clinic: {
      name: "Mind Wellness Center",
      address: "Seattle, WA",
    },
    availability: [
      {
        date: "2026-02-21",
        slots: [
          { time: "16:00", isBooked: false },
          { time: "17:00", isBooked: false },
        ],
      },
    ],
    fee: 65,
    activeStatus: true,
  },

  {
    id: "dr-ethan-patel-008",
    slug: "dr-ethan-patel-gastroenterology",
    name: "Dr. Ethan Patel",
    title: "Gastroenterologist",
    yearsOfExperience: 13,
    bio: "Expert in digestive health and liver disorders.",
    doctorImage: "/doctors/image.png",
    specializations: ["Gastroenterology", "Liver Disease"],
    clinic: {
      name: "Digestive Care Clinic",
      address: "Houston, TX",
    },
    availability: [
      {
        date: "2026-02-22",
        slots: [
          { time: "11:00", isBooked: false },
          { time: "12:00", isBooked: true },
        ],
      },
    ],
    fee: 58,
    activeStatus: true,
  },

  {
    id: "dr-lucas-garcia-009",
    slug: "dr-lucas-garcia-pulmonology",
    name: "Dr. Lucas Garcia",
    title: "Pulmonologist",
    yearsOfExperience: 17,
    bio: "Specializes in respiratory diseases and sleep disorders.",
    doctorImage: "/doctors/image.png",
    specializations: ["Pulmonology", "Sleep Medicine"],
    clinic: {
      name: "Respiratory Health Center",
      address: "Denver, CO",
    },
    availability: [
      {
        date: "2026-02-23",
        slots: [
          { time: "10:00", isBooked: false },
          { time: "11:00", isBooked: false },
        ],
      },
    ],
    fee: 60,
    activeStatus: true,
  },

  {
    id: "dr-amelia-johnson-010",
    slug: "dr-amelia-johnson-gynecology",
    name: "Dr. Amelia Johnson",
    title: "Gynecologist & Obstetrician",
    yearsOfExperience: 19,
    bio: "Providing comprehensive women’s healthcare and maternity services.",
    doctorImage: "/doctors/image.png",
    specializations: ["Gynecology", "Obstetrics"],
    clinic: {
      name: "Women Care Hospital",
      address: "San Diego, CA",
    },
    availability: [
      {
        date: "2026-02-24",
        slots: [
          { time: "09:00", isBooked: false },
          { time: "10:30", isBooked: false },
        ],
      },
    ],
    fee: 62,
    activeStatus: true,
  },
];
