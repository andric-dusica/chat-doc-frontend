import React, { createContext, useContext, useState } from 'react';

const PromptContext = createContext();

export const usePrompts = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
    const [prompts, setPrompts] = useState([]);

    const addPrompt = (prompt) => {
        setPrompts((prevPrompts) => [...prevPrompts, prompt]);
    };


    return (
        <PromptContext.Provider value={{ prompts, addPrompt }}>
            {children}
        </PromptContext.Provider>
    );
};
