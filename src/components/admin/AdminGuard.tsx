
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminGuardProps {
  children: React.ReactNode;
  setUnsavedChanges?: (value: boolean) => void;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children, setUnsavedChanges }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin-auth') === 'true';
    
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);
  
  // Add this context for child components to access setUnsavedChanges
  const contextValue = {
    setUnsavedChanges: setUnsavedChanges || (() => {}),
  };
  
  return (
    <AdminGuardContext.Provider value={contextValue}>
      {children}
    </AdminGuardContext.Provider>
  );
};

// Create a context to allow child components to access the setUnsavedChanges function
export const AdminGuardContext = React.createContext<{
  setUnsavedChanges: (value: boolean) => void;
}>({
  setUnsavedChanges: () => {},
});

// Custom hook to use the admin guard context
export const useAdminGuard = () => {
  return React.useContext(AdminGuardContext);
};
