# 🏥 Prescripto - Doctor Booking System

**Prescripto** is a professional appointment scheduling platform built with **Next.js 16**. It features a dual-interface system where users can book appointments by date/time and administrators can manage doctors and appointment statuses (Pending, Approved, Cancelled).

---

## ✨ Core Features

* **User Authentication:** Secure login/signup using `Next-Auth` and `bcryptjs`.
* **Doctor Directory:** Browse and search for doctors with detailed profiles.
* **Smart Booking:** Choose specific dates and time slots for appointments.
* **Admin Dashboard:** * Add, Update, and Delete doctor records.
    * Manage appointment lifecycle (Approve/Cancel).
* **Image Hosting:** Cloud-based image storage via `Cloudinary`.
* **Responsive UI:** Beautiful icons with `Lucide-React` and smooth alerts via `SweetAlert2`.

---

## 🛠️ Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **Next.js 16** | Full-stack Framework (App Router) |
| **MongoDB & Mongoose** | NoSQL Database & Schema Modeling |
| **Next-Auth** | Authentication & Session Management |
| **Cloudinary** | Image Hosting & Optimization |
| **React Hook Form** | Efficient Form Handling |
| **Lucide React** | Modern UI Icons |
| **SweetAlert2** | Interactive Pop-ups & Notifications |

---

## ⚙️ Installation & Setup

Follow these precise steps to get your local environment ready:

1. **Clone the repository:**
   ```bash
   https://github.com/Niloy-Modak/prescipto-web-app

2. **Navigate repository:**
   ```bash
   cd project
3. **Install dependencies:**
   ```bash
   npm install

4. **Set up environment variables:**
   ```bash
   NEXT_PUBLIC_BASE_UR
   MONGODB_URI
   NEXTAUTH_SECRET
   CLOUDINARY_URL

5. **Run the Project:**
   ```bash
   npm run dev

