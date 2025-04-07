import React, { createContext, useContext, useState } from 'react';

const UserManagementContext = createContext();

export const useUserManagement = () => useContext(UserManagementContext);

export const UserManagementProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]); 
  const [newSessionClicked, setNewSessionClicked] = useState(false); 

  return (
    <UserManagementContext.Provider value={{ breadcrumbs, setBreadcrumbs, newSessionClicked, setNewSessionClicked }}>
      {children}
    </UserManagementContext.Provider>
  );
};
