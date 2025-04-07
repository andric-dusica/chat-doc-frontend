import React, { createContext, useContext, useState } from 'react';

const PdfContext = createContext();

export const usePdf = () => useContext(PdfContext);

export const PdfProvider = ({ children }) => {
    const [pdfState, setPdfState] = useState({ selectedPdfFile: null });

    return (
        <PdfContext.Provider value={{ pdfState, setPdfState }}>
            {children}
        </PdfContext.Provider>
    );
};
