import React, { createContext, useContext, useState } from 'react';

const FileExplorerContext = createContext();

export const useFileExplorer = () => useContext(FileExplorerContext);

export const FileExplorerProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [newSessionClicked, setNewSessionClicked] = useState(false); 

  return (
    <FileExplorerContext.Provider value={{ breadcrumbs, setBreadcrumbs, newSessionClicked, setNewSessionClicked }}>
      {children}
    </FileExplorerContext.Provider>
  );
};
