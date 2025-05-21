
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      // Check if authenticated with Supabase
      const { data } = await supabase.auth.getSession();
      const isAuthenticated = !!data.session || localStorage.getItem('admin-auth') === 'true';
      
      if (!isAuthenticated) {
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  return <>{children}</>;
};
