import React from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import ForgotPassword from '../components/auth/ForgotPassword';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import LoadingAnimation from '../components/common/LoadingAnimation';
import RouteGuard from '../components/common/RouteGuard';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('../components/Dashboard'));
const MattersList = React.lazy(() => import('../components/matters/MattersList'));
const MatterForm = React.lazy(() => import('../components/matters/MatterForm'));
const MatterDetails = React.lazy(() => import('../components/matters/MatterDetails'));
const Calendar = React.lazy(() => import('../components/calendar/Calendar'));
const DocumentLibrary = React.lazy(() => import('../components/documents/CaseDocuments'));
const Templates = React.lazy(() => import('../components/documents/DocumentTemplates'));
const DocumentSharing = React.lazy(() => import('../components/documents/DocumentSharing'));
const ESignature = React.lazy(() => import('../components/documents/ESignature'));
const Invoices = React.lazy(() => import('../components/billing/BillingInvoices'));
const TimeTracking = React.lazy(() => import('../components/billing/TimeTracking'));
const BillingPreferences = React.lazy(() => import('../components/billing/BillingPreference'));
const CourtCalendar = React.lazy(() => import('../components/court/CourtCalendar'));
const CourtDocuments = React.lazy(() => import('../components/court/CourtDocuments'));
const Settings = React.lazy(() => import('../components/settings/Settings'));
const LegalResearch = React.lazy(() => import('../components/research/LegalResearch'));
const ClientPortal = React.lazy(() => import('../components/client/ClientPortal'));
const TaskManagement = React.lazy(() => import('../components/tasks/TaskManagement'));
const TeamManagement = React.lazy(() => import('../components/team/TeamManagement'));
const Timeline = React.lazy(() => import('../components/timeline/Timeline'));
const Messages = React.lazy(() => import('../components/messages/Messages'));

// Wrap Suspense around components
const SuspenseWrapper = ({ children }) => (
  <React.Suspense fallback={<LoadingAnimation />}>
    {children}
  </React.Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route element={<RouteGuard><Outlet /></RouteGuard>}>
        <Route path="/" element={<SuspenseWrapper><Dashboard /></SuspenseWrapper>} />
        <Route path="/messages" element={<SuspenseWrapper><Messages /></SuspenseWrapper>} />

        {/* Matters routes */}
        <Route path="matters" element={<Outlet />}>
          <Route index element={<SuspenseWrapper><MattersList /></SuspenseWrapper>} />
          <Route path="new" element={<SuspenseWrapper><MatterForm /></SuspenseWrapper>} />
          <Route path=":id" element={<SuspenseWrapper><MatterDetails /></SuspenseWrapper>} />
          <Route path=":id/edit" element={<SuspenseWrapper><MatterForm /></SuspenseWrapper>} />
          <Route path="templates" element={<SuspenseWrapper><Templates /></SuspenseWrapper>} />
          <Route path="timeline" element={<SuspenseWrapper><Timeline type="matter" /></SuspenseWrapper>} />
        </Route>

        {/* Tasks routes */}
        <Route path="tasks" element={<Outlet />}>
          <Route index element={<SuspenseWrapper><TaskManagement /></SuspenseWrapper>} />
          <Route path="my-tasks" element={<SuspenseWrapper><TaskManagement filter="my-tasks" /></SuspenseWrapper>} />
          <Route path="team" element={<SuspenseWrapper><TaskManagement filter="team" /></SuspenseWrapper>} />
          <Route path="timeline" element={<SuspenseWrapper><Timeline type="tasks" /></SuspenseWrapper>} />
        </Route>

        {/* Legal Research routes */}
        <Route path="research" element={<Outlet />}>
          <Route index element={<SuspenseWrapper><LegalResearch /></SuspenseWrapper>} />
          <Route path="case-law" element={<SuspenseWrapper><LegalResearch /></SuspenseWrapper>} />
          <Route path="analysis" element={<SuspenseWrapper><LegalResearch /></SuspenseWrapper>} />
          <Route path="templates" element={<SuspenseWrapper><Templates /></SuspenseWrapper>} />
        </Route>

        {/* Client Portal routes */}
        <Route path="clients" element={<Outlet />}>
          <Route index element={<SuspenseWrapper><ClientPortal /></SuspenseWrapper>} />
          <Route path="messages" element={<SuspenseWrapper><ClientPortal section="messages" /></SuspenseWrapper>} />
          <Route path="documents" element={<SuspenseWrapper><ClientPortal section="documents" /></SuspenseWrapper>} />
          <Route path="timeline" element={<SuspenseWrapper><Timeline type="client" /></SuspenseWrapper>} />
        </Route>

        {/* Calendar routes */}
        <Route path="calendar" element={<Outlet />}>
          <Route index element={<SuspenseWrapper><Calendar /></SuspenseWrapper>} />
          <Route path="team" element={<SuspenseWrapper><Calendar view="team" /></SuspenseWrapper>} />
          <Route path="court" element={<SuspenseWrapper><CourtCalendar /></SuspenseWrapper>} />
          <Route path="deadlines" element={<SuspenseWrapper><Calendar view="deadlines" /></SuspenseWrapper>} />
        </Route>

        {/* Time & Billing routes */}
        <Route path="billing" element={<Outlet />}>
          <Route path="time-tracking" element={<SuspenseWrapper><TimeTracking /></SuspenseWrapper>} />
          <Route path="invoices" element={<SuspenseWrapper><Invoices /></SuspenseWrapper>} />
          <Route path="expenses" element={<SuspenseWrapper><BillingPreferences /></SuspenseWrapper>} />
          <Route path="reports" element={<SuspenseWrapper><BillingPreferences /></SuspenseWrapper>} />
        </Route>

        {/* Documents routes */}
        <Route path="documents" element={<Outlet />}>
          <Route index element={<SuspenseWrapper><DocumentLibrary /></SuspenseWrapper>} />
          <Route path="templates" element={<SuspenseWrapper><Templates /></SuspenseWrapper>} />
          <Route path="sharing" element={<SuspenseWrapper><DocumentSharing /></SuspenseWrapper>} />
          <Route path="signatures" element={<SuspenseWrapper><ESignature /></SuspenseWrapper>} />
          <Route path="timeline" element={<SuspenseWrapper><Timeline type="documents" /></SuspenseWrapper>} />
        </Route>

        {/* Team routes */}
        <Route path="team" element={<Outlet />}>
          <Route index element={<SuspenseWrapper><TeamManagement /></SuspenseWrapper>} />
          <Route path="roles" element={<SuspenseWrapper><TeamManagement section="roles" /></SuspenseWrapper>} />
          <Route path="allocation" element={<SuspenseWrapper><TeamManagement section="allocation" /></SuspenseWrapper>} />
          <Route path="performance" element={<SuspenseWrapper><TeamManagement section="performance" /></SuspenseWrapper>} />
        </Route>

        {/* Court routes */}
        <Route path="court" element={<Outlet />}>
          <Route path="calendar" element={<SuspenseWrapper><CourtCalendar /></SuspenseWrapper>} />
          <Route path="documents" element={<SuspenseWrapper><CourtDocuments /></SuspenseWrapper>} />
          <Route path="e-filing" element={<SuspenseWrapper><CourtDocuments /></SuspenseWrapper>} />
          <Route path="timeline" element={<SuspenseWrapper><Timeline type="court" /></SuspenseWrapper>} />
        </Route>

        {/* Settings routes */}
        <Route path="settings/*" element={<SuspenseWrapper><Settings /></SuspenseWrapper>} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;