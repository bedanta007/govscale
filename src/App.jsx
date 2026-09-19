import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProcurementProvider } from './context/ProcurementContext';

// Layouts
import AppShell from './layouts/AppShell';
import PublicLayout from './layouts/PublicLayout';

// Public / Auth Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import NotFoundPage from './pages/public/NotFoundPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';

// Dashboard Pages (role-based)
import DashboardPage from './pages/app/DashboardPage';

// Tenders
import TendersListPage from './pages/app/TendersListPage';
import TenderDetailPage from './pages/app/TenderDetailPage';

// Bids / Proposals
import BidsPage from './pages/app/BidsPage';
import BidDetailPage from './pages/app/BidDetailPage';

// Evaluations
import EvaluationsPage from './pages/app/EvaluationsPage';

// Contracts / Awards
import ContractsPage from './pages/app/ContractsPage';

// Pilots / Telemetry
import PilotsPage from './pages/app/PilotsPage';

// Onboarding
import OnboardingPage from './pages/app/OnboardingPage';

// Audit Trail
import AuditPage from './pages/app/AuditPage';

// Profile
import ProfilePage from './pages/app/ProfilePage';

// Admin
import AdminUsersPage from './pages/app/admin/AdminUsersPage';
import AdminVerificationsPage from './pages/app/admin/AdminVerificationsPage';

// Schemes & Opportunities Hub
import SchemesOpportunitiesPage from './pages/app/SchemesOpportunitiesPage';

// Protected Route Guard
function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(currentUser?.role)) return <Navigate to="/unauthorized" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/* Protected App Routes */}
      <Route element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tenders" element={<TendersListPage />} />
        <Route path="/tenders/:id" element={<TenderDetailPage />} />
        <Route path="/bids" element={<BidsPage />} />
        <Route path="/bids/:id" element={<BidDetailPage />} />
        <Route path="/evaluations" element={
          <ProtectedRoute roles={['Evaluator', 'Procurement Officer', 'Admin']}>
            <EvaluationsPage />
          </ProtectedRoute>
        } />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/pilots" element={<PilotsPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/schemes-opportunities" element={<SchemesOpportunitiesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/users" element={
          <ProtectedRoute roles={['Admin']}>
            <AdminUsersPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/verifications" element={
          <ProtectedRoute roles={['Admin']}>
            <AdminVerificationsPage />
          </ProtectedRoute>
        } />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProcurementProvider>
          <AppRoutes />
        </ProcurementProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
