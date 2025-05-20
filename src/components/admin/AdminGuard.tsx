
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin-auth') === 'true';
    
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);
  
  return <>{children}</>;
};
