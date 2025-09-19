import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardStudent from './pages/dashboards/DashboardStudent';
import DashboardAlumni from './pages/dashboards/DashboardAlumni';
import DashboardCoordinator from './pages/dashboards/DashboardCoordinator';
import DashboardPlacement from './pages/dashboards/DashboardPlacement';
import DashboardOffice from './pages/dashboards/DashboardOffice';
import ProfilePage from './pages/common/ProfilePage';
import AlumniCollectionPage from './pages/common/AlumniCollectionPage';
import ApprovalsPage from './pages/common/ApprovalsPage';
import RequestsPage from './pages/common/RequestsPage';
import JobsPage from './pages/common/JobsPage';

function RoleGuard({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

// PUBLIC_INTERFACE
function App() {
  /** Root application with routing and context providers. */
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthOnly><LoginPage /></AuthOnly>} />
          <Route path="/register" element={<AuthOnly><RegisterPage /></AuthOnly>} />
          <Route
            path="/"
            element={
              <Protected>
                <MainLayout />
              </Protected>
            }
          >
            <Route index element={<LandingByRole />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="alumni-collection" element={<RoleGuard roles={['Coordinator', 'OfficeIncharge']}><AlumniCollectionPage /></RoleGuard>} />
            <Route path="approvals" element={<RoleGuard roles={['Coordinator', 'OfficeIncharge']}><ApprovalsPage /></RoleGuard>} />
            <Route path="requests" element={<RequestsPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="student" element={<RoleGuard roles={['Student']}><DashboardStudent /></RoleGuard>} />
            <Route path="alumni" element={<RoleGuard roles={['Alumni']}><DashboardAlumni /></RoleGuard>} />
            <Route path="coordinator" element={<RoleGuard roles={['Coordinator']}><DashboardCoordinator /></RoleGuard>} />
            <Route path="placement" element={<RoleGuard roles={['PlacementIncharge']}><DashboardPlacement /></RoleGuard>} />
            <Route path="office" element={<RoleGuard roles={['OfficeIncharge']}><DashboardOffice /></RoleGuard>} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function AuthOnly({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
}

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function LandingByRole() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const map = {
    Student: '/student',
    Alumni: '/alumni',
    Coordinator: '/coordinator',
    PlacementIncharge: '/placement',
    OfficeIncharge: '/office',
  };
  return <Navigate to={map[user.role] || '/profile'} replace />;
}

export default App;
