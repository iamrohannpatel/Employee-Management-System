import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { userData } = useAuth();
    const user = userData;

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
        // Check if role matches. 
        // Note: admin usually can access everything, but let's be strict for now or allow admin to access HR pages if needed.
        // For simple RBAC: strict match.
        // If requiredRole is an array, we can check if user.role is in it.

        let hasAccess = false;
        if (Array.isArray(requiredRole)) {
            hasAccess = requiredRole.includes(user.role);
        } else {
            hasAccess = user.role === requiredRole;
        }

        if (!hasAccess) {
            // Logged in but not authorized.
            // Redirect to their own dashboard or a 403 page.
            // For simplicity, redirect to their main dashboard.
            if (user.role === 'admin') return <Navigate to="/admin-dashboard" replace />;
            if (user.role === 'hr') return <Navigate to="/hr-dashboard" replace />;
            if (user.role === 'employee') return <Navigate to="/employee-dashboard" replace />;

            return <Navigate to="/login" replace />; // Fallback
        }
    }

    return children;
};

export default ProtectedRoute;
