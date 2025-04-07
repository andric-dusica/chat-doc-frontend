import React, { createContext, useContext, useState } from 'react';

const PersonaContext = createContext();

export const usePersonas = () => useContext(PersonaContext);

export const PersonaProvider = ({ children }) => {
    const [personas, setPersonas] = useState([]);

    const addPersona = (persona) => {
        setPersonas(prev => [...prev, persona]);
    };

    return (
        <PersonaContext.Provider value={{ personas, addPersona }}>
            {children}
        </PersonaContext.Provider>
    );
};