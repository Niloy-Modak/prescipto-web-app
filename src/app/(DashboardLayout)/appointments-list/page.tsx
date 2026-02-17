import ApponmentsTable from '@/components/pages/DashBoardPages/apponments/ApponmentsTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin Dashboard - All Appointments",
  description: "Admin dashboard page",
};

const AdminDashboardPage = () => {
    return (
        <div>
            <ApponmentsTable/>
        </div>
    );
};

export default AdminDashboardPage;