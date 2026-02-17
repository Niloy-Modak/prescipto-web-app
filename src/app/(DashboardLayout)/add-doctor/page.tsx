import CreateDoctorForm from '@/components/pages/DashBoardPages/addDoctorForm/CreateDoctorForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin Dashboard - Add Doctors info",
  description: "Admin dashboard page",
};

const AddDoctorPage = () => {
  return (
    <section>
      <CreateDoctorForm/>
    </section>
  );
};

export default AddDoctorPage;