import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isLoggedIn, currentUser } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && !roles.includes(currentUser?.role || '')) {
    // User is logged in but doesn't have the required role.
    // In a real app, you might show a "403 Forbidden" page.
    // For this prototype, we'll just render nothing to hide the content.
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;