import React, { createContext, useContext, useState } from 'react';

const SelectedNameContext = createContext();

export const useSelectedName = () => useContext(SelectedNameContext);

export const SelectedNameProvider = ({ children }) => {
    const [selectedName, setSelectedName] = useState("Default Persona");

    const updateSelectedName = (name) => {
        setSelectedName(name);
    };

    return (
        <SelectedNameContext.Provider value={{ selectedName, updateSelectedName }}>
            {children}
        </SelectedNameContext.Provider>
    );
};
