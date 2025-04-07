import React, { createContext, useContext, useState } from 'react';

const SelectedContentContext = createContext();

export const useSelectedContent = () => useContext(SelectedContentContext);

export const SelectedContentProvider = ({ children }) => {
    const [selectedContent, setSelectedContent] = useState('');

    return (
        <SelectedContentContext.Provider value={{ selectedContent, setSelectedContent }}>
            {children}
        </SelectedContentContext.Provider>
    );
};
