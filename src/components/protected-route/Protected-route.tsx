import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.loginReducer.isAuthenticated);
  const publicRoutes = ['/login', '/forgot-password', '/reset-password', '/register'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  
  return children;
};