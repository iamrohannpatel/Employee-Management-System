import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './context/AuthContext';
import EmployeeProvider from './context/EmployeeContext';
import AttendanceProvider from './context/AttendanceContext';
import TaskProvider from './context/TaskContext';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import TaskDashboard from './pages/TaskDashboard';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr-dashboard"
        element={
          <ProtectedRoute requiredRole="hr">
            <HRDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute requiredRole={['admin', 'hr', 'employee']}>
            <TaskDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EmployeeProvider>
          <AttendanceProvider>
            <TaskProvider>
              <AppContent />
            </TaskProvider>
          </AttendanceProvider>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
