import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DownloadPdf = ({ editorRef }) => {
    const downloadPdfDocument = () => {
        if (!editorRef.current) return;

        const editorDelta = editorRef.current.getEditor().getContents();
        const pdfContent = generatePDFContentFromDelta(editorDelta);

        const documentDefinition = {
            content: pdfContent,
        };

        pdfMake.createPdf(documentDefinition).download('document.pdf');
    };

    const fontSizeMap = {
        small: 10,
        normal: 13, 
        large: 19,
        huge: 32,
    };

    const generatePDFContentFromDelta = (delta) => {
        const content = [];
        let currentBlock = { text: [] };
    
        delta.ops.forEach((op) => {
            if (typeof op.insert === 'string') {
                const lines = op.insert.split('\n');
    
                lines.forEach((line, index) => {
                    let textAttributes = {
                        text: line,
                        bold: op.attributes?.bold || false,
                        italics: op.attributes?.italic || false,
                        decoration: op.attributes?.underline ? 'underline' : undefined,
                        fontSize: op.attributes?.size ? fontSizeMap[op.attributes.size] : fontSizeMap.normal,
                    };
    
                    currentBlock.text.push(textAttributes);
    
                    if (index < lines.length - 1) {
                        content.push(currentBlock);
                        content.push({ text: '\n', fontSize: fontSizeMap.normal });
                        currentBlock = { text: [] }; 
                    }
                });
            }
        });
    
        if (currentBlock.text.length > 0) {
            content.push(currentBlock);
        }
    
        return content.map(block => {
            if (block.text === '\n') return block;
    
            return {
                text: block.text.map(segment => ({
                    text: segment.text,
                    bold: segment.bold,
                    italics: segment.italics,
                    decoration: segment.decoration,
                    fontSize: segment.fontSize,
                })),
            };
        });
    };

    return (
        <button onClick={downloadPdfDocument}>PDF</button>
    );
};

export default DownloadPdf;
