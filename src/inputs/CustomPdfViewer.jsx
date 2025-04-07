import React, { useRef, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { usePdf } from './PdfContext';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const CustomPdfViewer = ({ pdfFile: propPdfFile, onDocumentLoadSuccess, scale, numPages, onPageChange, pageNumber, viewport }) => {
    const containerRef = useRef();
    const [currentPage, setCurrentPage] = useState(pageNumber || 1); 
    const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
    const { pdfState } = usePdf();
    const effectivePdfFile = propPdfFile || pdfState.selectedPdfFile;


    useEffect(() => {
        const smoothScrollTo = (targetY) => {
          setIsProgrammaticScroll(true); 
          const startY = containerRef.current.scrollTop;
          const change = targetY - startY;
          const startTime = performance.now();
      
          const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const fractionOfDuration = elapsedTime / 100; 
      
            if (fractionOfDuration < 1) {
              containerRef.current.scrollTop = startY + change * fractionOfDuration;
              requestAnimationFrame(animateScroll);
            } else {
              containerRef.current.scrollTop = targetY;
              setIsProgrammaticScroll(false); 
            }
          };
      
          requestAnimationFrame(animateScroll);
        };
      
        if (containerRef.current && numPages > 0 && pageNumber) {
          const pageHeight = containerRef.current.scrollHeight / numPages;
          const targetScrollTop = pageHeight * (pageNumber - 1);
          smoothScrollTo(targetScrollTop);
        }
      }, [pageNumber, numPages]);
      
    
    useEffect(() => {
        const handleScroll = () => {
            if (isProgrammaticScroll) {
                return; 
              }
            if (!isProgrammaticScroll && containerRef.current) {
                const currentScrollTop = containerRef.current.scrollTop;
                const pageHeight = containerRef.current.scrollHeight / numPages;
                const threshold = pageHeight / 2;
                const newPageNumber = Math.ceil((currentScrollTop + threshold) / pageHeight);
    
                if (newPageNumber !== pageNumber) {
                    onPageChange(newPageNumber);
                }
            }
        };
    
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
    
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [numPages, onPageChange, pageNumber, isProgrammaticScroll]);
    

    const changePage = (newPageNumber) => {
        setIsProgrammaticScroll(true);
        onPageChange(newPageNumber);
        setTimeout(() => setIsProgrammaticScroll(false), 100); 
    };

    return (
        <div 
            ref={containerRef} 
            style={{ 
                height: '89vh', 
                overflow: 'auto', 
                display: 'flex', 
                justifyContent: scale <= 1 ? 'center' : 'flex-start' 
            }}
            >
            <Document file={effectivePdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages }, (_, index) => (
                    <React.Fragment key={index}>
                        <Page pageNumber={index + 1} scale={scale}  viewport={viewport} />
                        {index < numPages - 1 && <hr style={{ width: '100%', border: 'none', borderBottom: '1px solid #ccc' }} />}
                    </React.Fragment>
                ))}
            </Document>
        </div>
    );
};

export default CustomPdfViewer;