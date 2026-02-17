import DoctorTable from '@/components/pages/DashBoardPages/addedDoctors/DoctorTable';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Admin Dashboard - Added Doctors",
  description: "Admin dashboard page",
};

const AddedDoctorPage = () => {
    return (
        <div>
          <DoctorTable/>  
        </div>
    );
};

export default AddedDoctorPage;