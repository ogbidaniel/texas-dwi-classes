import { useContext } from 'react';
import { AuthContext } from '../_app';
import StudentDashboard from '../../components/dashboards/StudentDashboard';
import InstructorDashboard from '../../components/dashboards/InstructorDashboard';
import AdminDashboard from '../../components/dashboards/AdminDashboard';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const dashboardComponents = {
    student: StudentDashboard,
    instructor: InstructorDashboard,
    admin: AdminDashboard
  };

  const DashboardComponent = dashboardComponents[user?.role] || StudentDashboard;

  return <DashboardComponent />;
}