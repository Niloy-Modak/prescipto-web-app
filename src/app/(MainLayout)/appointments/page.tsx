import AppointmentTable from '@/components/pages/appointments/AppointmentTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Doctor Appointments Page | Prescripto",
  description: "All available doctor information for booking",
};

const AppointmentListPage = () => {
    return (
        <div>
            <AppointmentTable/>
        </div>
    );
};

export default AppointmentListPage;