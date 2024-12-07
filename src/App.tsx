import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAuthStore } from './stores/auth';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Team from './pages/Team';
import Settings from './pages/Settings';
import Support from './pages/Support';
import AuthGuard from './components/AuthGuard';
import AppLayout from './components/AppLayout';
import Sidebar from './components/Sidebar';
import { ThemeProvider } from './components/ThemeProvider';

// Configure React Router future flags
const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

// Layout wrapper for authenticated routes
const AuthLayout = () => (
  <AuthGuard>
    <Outlet />
  </AuthGuard>
);

// Main layout wrapper for authenticated pages
const MainLayout = () => (
  <AppLayout>
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  </AppLayout>
);

export default function App() {
  const { checkUser } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter {...routerConfig}>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<AuthLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/team" element={<Team />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Support />} />
            </Route>
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all other routes and redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
