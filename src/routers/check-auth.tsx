import { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

interface IProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: IProps) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Fragment>{children}</Fragment>;
};
const ProtectedRoute = ({ children }: IProps) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <Fragment>{children}</Fragment>;
};

export { PublicRoute, ProtectedRoute };
