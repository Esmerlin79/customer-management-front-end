import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { Layout } from '../components/layout/Layout';

import { ProtectedRoute } from './ProtectedRoute';
import { RouteFallback } from './RouteFallback';

const Login = lazy(() =>
  import(/* webpackChunkName: "page-login" */ '../pages/Login').then((m) => ({
    default: m.Login,
  }))
);
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "page-dashboard" */ '../pages/Dashboard').then(
    (m) => ({ default: m.Dashboard })
  )
);
const ClientsList = lazy(() =>
  import(/* webpackChunkName: "page-clients" */ '../pages/Clients').then(
    (m) => ({ default: m.ClientsList })
  )
);
const ClientFormPage = lazy(() =>
  import(/* webpackChunkName: "page-client-form" */ '../pages/ClientForm').then(
    (m) => ({ default: m.ClientFormPage })
  )
);
const ClientDetail = lazy(() =>
  import(/* webpackChunkName: "page-client-detail" */ '../pages/ClientDetail').then(
    (m) => ({ default: m.ClientDetail })
  )
);
const NotFound = lazy(() =>
  import(/* webpackChunkName: "page-not-found" */ '../pages/NotFound').then(
    (m) => ({ default: m.NotFound })
  )
);

const Private = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

export const AppRoutes = () => (
  <ErrorBoundary>
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Private><Dashboard /></Private>} />
        <Route path="/clients" element={<Private><ClientsList /></Private>} />
        <Route path="/clients/new" element={<Private><ClientFormPage /></Private>} />
        <Route path="/clients/:id" element={<Private><ClientDetail /></Private>} />
        <Route path="/clients/:id/edit" element={<Private><ClientFormPage /></Private>} />
        <Route path="/404" element={<Private><NotFound /></Private>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
);
